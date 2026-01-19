import redis from '@adonisjs/redis/services/main'

export class LockService {
  async acquire(ownerId: string, resource: string, ttl: number) {
    const ownerAcquired = await this.getOwner(ownerId)

    if (ownerAcquired) {
      await this.release(ownerId, ownerAcquired)
    }

    const script = `
    if redis.call("exists", KEYS[1]) == 1 or redis.call("exists", KEYS[2]) == 1 then
      return 0
    end
    redis.call("set", KEYS[1], KEYS[2], "EX", ARGV[1])
    redis.call("set", KEYS[2], KEYS[1], "EX", ARGV[1])
    return "OK"`

    const result = await redis.eval(script, 2, ownerId, resource, ttl)
    return result === 'OK'
  }

  async release(ownerId: string, resource: string) {
    const script = `if redis.call("get", KEYS[1]) ~= KEYS[2] or redis.call("get", KEYS[2]) ~= KEYS[1] then
      return 0
    end
    redis.call("del", KEYS[1])
    redis.call("del", KEYS[2])
    return "OK"
`
    const result = await redis.eval(script, 2, ownerId, resource)
    return result === 'OK'
  }

  async isLocked(resource: string) {
    return redis.exists(resource)
  }

  async getOwner(ownerId: string) {
    return redis.get(ownerId)
  }
}
