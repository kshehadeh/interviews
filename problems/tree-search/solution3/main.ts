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

function findComponentsByType(
    tree: ComponentNode,
    targetType: string
): ComponentNode[] {
    const result: ComponentNode[] = []

    function visit(node: ComponentNode) {
        if (node.type === targetType) {
            result.push(node)
        }
        if (node.children) {
            for (const child of node.children) {
                visit(child)
            }
        }
    }

    visit(tree)
    return result
}

console.log(findComponentsByType(tree, "Button"))
