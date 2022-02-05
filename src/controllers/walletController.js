export async function getWallet(req, res) {
    const user = await res.locals.user
    res.send(user)
}

export async function postWallet(req, res) {
    res.sendStatus(`201`)
}