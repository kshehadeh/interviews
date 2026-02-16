interface ComponentNode {
    id: string
    type: string
    children?: ComponentNode[]
}

const tree: ComponentNode = {
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

function flatten(tree: ComponentNode): ComponentNode[] {
    return (tree.children || []).reduce(
        (acc, c) => [...acc, ...flatten(c)],
        [tree]
    ) || []
}


function findComponentsByType(
    tree: ComponentNode,
    targetType: string
): ComponentNode[] {
    return flatten(tree).filter(node => node.type === targetType)
}

console.log(findComponentsByType(tree, "Button"))
