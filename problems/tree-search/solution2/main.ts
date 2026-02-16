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
    const result: ComponentNode[] = [tree]

    if (tree.children) {
        for (const child of tree.children) {
            result.push(...flatten(child))
        }
    }

    return result
}


function findComponentsByType(
    tree: ComponentNode,
    targetType: string
): ComponentNode[] {
    return flatten(tree).filter(node => node.type === targetType)
}

console.log(findComponentsByType(tree, "Button"))
