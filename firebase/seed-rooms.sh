#!/usr/bin/env bash

firebase database:get '/rooms'EXIST=$(firebase database:get '/rooms')
if [ "$EXIST" == "null" ]; then
  SEED='{
    "chatRoomStates":{
      "facebook":{"name":"Facebook", "order": 0},
      "apple":{"name":"Apple", "order": 1},
      "amazon":{"name":"Amazon", "order": 2},
      "netflix":{"name":"Netflix", "order": 3},
      "google":{"name":"Google", "order": 4}
    }
  }'
  echo "${SEED}" | firebase database:update / -y
fi
