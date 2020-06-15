type RouteEnterNext<T> = (next: (vm: T) => any) => void

type RouteNext = (next?: boolean) => void

type RouterLinkSlotProps = {
  href: string;
  navigate: () => void
}

type Dictionary<T> = {
  [key: string]: T
}

enum KeyCode {
  Enter = 13,
}

export {
  RouteEnterNext,
  RouteNext,
  RouterLinkSlotProps,
  KeyCode,
  Dictionary,
}
