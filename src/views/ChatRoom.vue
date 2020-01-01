<template>
  <div class="page">
    <h3 class="page__header chat-room__header">
      <span class="chat-room__title">
        <span class="chat-room__title-badge badge">👨‍👩‍👧‍👦{{ countUsers }}</span>
        <span class="chat-room__title-text">{{ chatRoomName }}</span>
      </span>
      <button
        type="button"
        class="chat-room__exit-button button button_yellow"
        @click="exit()"
      >
        나가기
      </button>
    </h3>
    <div class="page__content">
      <ul class="chat-room__list">
        <li
          v-for="(message, index) in messageList"
          :key="index"
          class="chat-room__list-item"
          :class="{
            'chat-room__list-item-me': message.senderId === me,
            'chat-room__list-item-people': message.senderId !== me
          }"
        >
          <div
            v-if="message.senderId !== me"
            class="initial"
          >
            {{ message.senderId }}
          </div>
          <div
            class="text-box"
            :class="`text-box_align_${message.senderId === me ? 'right' : 'left'}`"
          >
            <div
              v-if="message.senderId !== me"
              class="nickname"
            >
              123
            </div>
            <div
              class="balloon"
              :class="`balloon_align_${message.senderId === me ? 'right' : 'left'}`"
            >
              <div
                class="balloon__arrow"
                :class="`balloon__arrow_direction_${message.senderId === me ? 'right' : 'left'}`"
              />
              <div
                class="text"
                :class="{ 'text_yellow': message.senderId === me }"
              >
                {{ message.message }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-form">
      <div class="chat-form__menu">
        <label class="button">
          🖼
          <input
            type="file"
            accept="image/*"
            hidden
          >
        </label>
      </div>
      <div class="chat-form__input-area">
        <textarea class="chat-form__input" />
        <div class="chat-form__send-button-container">
          <button
            type="submit"
            class="chat-form__send-button button button_yellow"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouteNames from '@/router/route-names'

@Component
export default class Chat extends Vue {
  chatRoomName: string = 'roomroomroomroomroomroomroomroomroomroomroomroomroomroomroom'
  countUsers = 3
  messageList = [
    {
      message: '11238201983. 129038029183. 12398210938092183092183 11238201983. 129038029183. 12398210938092183092183\n' +
        '          11238201983. 129038029183. 1239821093809218309218311238201983. 129038029183. 12398210938092183092183',
      senderId: 1,
      sentAt: Date.now(),
    },
    {
      message: '1',
      senderId: 2,
      sentAt: Date.now(),
    },
    {
      message: '2',
      senderId: 1,
      sentAt: Date.now(),
    },
    {
      message: '34567',
      senderId: 2,
      sentAt: Date.now(),
    },
  ]

  me = 1

  exit() {
    this.$router.replace({ name: RouteNames.ChatRoomList })
  }
}
</script>

<style lang="scss">
.chat-room {
  @include flex(column);
  padding: 0 $spacer;
  line-height: $base-line-height;

  &__header {
    @include flex();
  }

  &__title {
    @include flex(null, center, null);
    @include text-overflow();

    &-text {
      @include text-overflow();
    }
    &-badge {
      margin: 0 $spacer;
      flex-shrink: 0;
    }
  }

  &__exit-button {
    margin: 0 $spacer;
    flex-shrink: 0;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__list-item {
    @include flex(null, flex-start);
    margin-bottom: $half-spacer;
    margin-right: 40%;

    &-me {
      margin-right: 0;
      margin-left: 40%;
      flex-direction: row-reverse;
    }
  }
}

.balloon {
  @include flex(null, flex-start);
  flex: 1;

  &_align {
    &_right {
      flex-direction: row-reverse;
    }
  }

  &__arrow {
    position: relative;
    display: block;
    width: .5rem;
    height: 1rem;
    flex-shrink: 0;

    &::before,
    &::after {
      position: absolute;
      display: block;
      content: "";
      border-color: transparent;
      border-style: solid;
    }

    &_direction {
      &_left {
        &:after {
          top: 3px;
          left: 1px;
          border-width: .1rem .7rem .7rem 0;
          border-right-color: $light-color;
        }
      }

      &_right {
        &:after {
          top: 3px;
          right: 1px;
          border-width: .1rem 0 .7rem .7rem;
          border-left-color: $yellow-color;
        }
      }
    }
  }
}
.initial {
  width: 35px;
  height: 35px;
  background-color: darken($grey-color, 33%);
  color: $light-color;
  border-radius: 20px;
  @include flex(null, center, center);
}
.nickname {
  margin-left: $half-spacer;
  margin-bottom: $half-spacer / 2;
  color: lighten($black-color, 30%);
}
.text {
  background-color: $light-color;
  padding: $half-spacer;
  border-radius: $default-border-radius;
  @include box-shadow(0, 0,.02rem, rgba($black-color, .3));

  &_yellow {
    background-color: $yellow-color;
  }
}
.text-box {
  &_align {
    &_left {
      margin-left: $half-spacer;
    }
  }
}
.chat-form {
  background-color: $light-color;
  border-top: 1px solid $default-border-color;
  @include flex(column);

  &__menu {
    background-color: $grey-color;
  }

  &__input-area {
    @include flex();
    height: 100px;
    position: relative;
    border-top: 1px solid $grey-border-color;
  }

  &__input {
    flex-grow: 1;
    border: 0;
    padding: 15px 100px 15px 15px;
    resize: none;
  }

  &__send-button-container {
    @include flex();
    position: absolute;
    height: 100%;
    right: 0;
  }

  &__send-button {
    margin: 12px;
    width: 76px;
  }
}
</style>
