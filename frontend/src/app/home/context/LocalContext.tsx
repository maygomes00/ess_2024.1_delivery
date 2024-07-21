// Inicia o local store com informações base.
export const localContextStart = () => {
    localStorage.setItem('user', JSON.stringify({ id: "" }))
    localStorage.setItem('item', JSON.stringify({ id: "", name: "" }))
}

export const localContextEnd = () => {
    localStorage.clear()
}

// Pega uma informação dentro de um json no local store.
export const localContextGetInfo = (context: string, info: string) => {
    let contextToken = localStorage.getItem(context)
    if (contextToken) {
        const selected_context = JSON.parse(contextToken);
        return selected_context[info]
    }
    else {
        return ""
    }
}

export const localContextUpdateInfo = (context: string, info: string, new_value: string) => {
    let selected_context = localContextGetContext(context)
    if (selected_context) {
        selected_context[info] = new_value
        localStorage.setItem(context, JSON.stringify(selected_context))
    }
}

const localContextGetContext = (context: string) => {
    let contextToken = localStorage.getItem(context)
    if (contextToken) {
        return JSON.parse(contextToken);
    }
    else {
        return null
    }
}