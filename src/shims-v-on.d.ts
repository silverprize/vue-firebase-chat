import { ElementAdditionalAttrs, ComponentAdditionalAttrs } from 'vue-tsx-support/types/base'

declare module 'vue-tsx-support/types/base' {
  type VOn = {
    on?: Record<string, Function | Function[]>
  }

  interface ElementAdditionalAttrs extends VOn {}

  interface ComponentAdditionalAttrs extends VOn {}
}
