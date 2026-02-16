# Tree Search

"This will be a practical coding exercise. Please talk through your thinking as you go. You can ask clarifying questions. TypeScript is fine."


## Problem Statement

You're given a component tree that represents a UI layout.

Each node looks like this:

```
type ComponentNode = {
  id: string
  type: string
  props?: Record<string, any>
  children?: ComponentNode[]
}
```

## Task

Write a function:

```
function findComponentsByType(
  root: ComponentNode,
  targetType: string
): ComponentNode[]
```

It should return all components in the tree whose type matches targetType.

## Requirements

* Traverse the entire tree
* Preserve top-to-bottom, left-to-right order
* If root itself matches, include it
* Assume the tree can be arbitrarily deep


## Example

Input:

```
const tree = {
  id: "root",
  type: "Page",
  children: [
    {
      id: "header",
      type: "Header",
      children: [
        { id: "logo", type: "Image" },
        { id: "nav", type: "Nav" }
      ]
    },
    {
      id: "content",
      type: "Section",
      children: [
        { id: "hero", type: "Image" },
        { id: "cta", type: "Button" }
      ]
    }
  ]
}
```

Call:

`findComponentsByType(tree, "Image")`

Output:

```
[
  { id: "logo", type: "Image" },
  { id: "hero", type: "Image" }
]
```
