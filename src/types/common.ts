type RouteEnterNext<T> = (next: (vm: T) => any) => void

type RouteNext = (next?: boolean) => void

type RouterLinkSlotProps = {
  href: string;
  navigate: () => void
}

enum KeyCode {
  Enter = 13,
}

enum Dialog {
  INVITATION,
  CONFIRM_INVITATION,
  MESSAGE,
}

export {
  RouteEnterNext,
  RouteNext,
  RouterLinkSlotProps,
  KeyCode,
  Dialog,
}
