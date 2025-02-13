export type ContextMenuItemsProps = {
  items: Array<{
    icon: () => JSX.Element
    onOpen?: VoidFunction
    text: string
  }>
}
