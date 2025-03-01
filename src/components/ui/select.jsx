import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

const Select = SelectPrimitive.Root

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className="w-full px-3 py-2 border rounded-md bg-white text-left"
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
))

const SelectValue = SelectPrimitive.Value

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className="bg-white border rounded-md shadow-lg"
      {...props}
    >
      <SelectPrimitive.Viewport className="p-2">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left w-full"
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }