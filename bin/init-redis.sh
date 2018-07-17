#! /bin/bash

redis-cli << __EOF__

hset smoothie field1 'red'

hset smoothie field2 'blue'

hgetall smoothie

__EOF__