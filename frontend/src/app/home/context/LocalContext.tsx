// Inicia o local store com informações base.
export const localContextStart = () => {
    localStorage.setItem('user', JSON.stringify({ id: "" }))
    localStorage.setItem('item', JSON.stringify({ id: "", name: "" }))
}

// Apaga todas as informações do local storage. 
export const localContextEnd = () => {
    localStorage.clear()
}

// Pega uma informação dentro de um contexto (json no local storage).
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

// Atualiza o valor de uma informação dentro de um contexto (json no local storage).
export const localContextUpdateInfo = (context: string, info: string, new_value: string) => {
    let selected_context = localContextGetContext(context)
    if (selected_context) {
        selected_context[info] = new_value
        localStorage.setItem(context, JSON.stringify(selected_context))
    }
}

// Retorna o contexto, no formato de um json.
const localContextGetContext = (context: string) => {
    let contextToken = localStorage.getItem(context)
    if (contextToken) {
        return JSON.parse(contextToken);
    }
    else {
        return null
    }
}