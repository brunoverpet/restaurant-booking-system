import redis from '@adonisjs/redis/services/main'

export class LockService {
  async acquire(resource: string, ownerId: string, ttl: number) {
    const script = `return redis.call("set", KEYS[1], ARGV[1], "NX", "EX", ARGV[2])`

    return redis.eval(script, 1, resource, ownerId, ttl)
  }

  async release(resource: string, ownerId: string) {
    const script = `if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
  else
    return 0
  end
`
    return redis.eval(script, 1, resource, ownerId)
  }

  async isLocked(resource: string) {
    return redis.exists(resource)
  }

  async getOwner(resource: string) {
    return redis.get(resource)
  }
}
