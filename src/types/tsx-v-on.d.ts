import { ComponentAdditionalAttrs, ElementAdditionalAttrs } from 'vue-tsx-support/types/base'

declare module 'vue-tsx-support/types/base' {
  interface VOn {
    on?: Record<string, Function | Function[]>
  }

  interface ElementAdditionalAttrs extends VOn {}

  interface ComponentAdditionalAttrs extends VOn {}
}
