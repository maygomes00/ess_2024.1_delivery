import multer from "multer"
import path from "path"

const store_path = "./src/data/itens/images"

const file_store = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, path.resolve(store_path))
    },
    filename(req, file, callback) {
        const t = new Date().getTime()
        const rest_id = req.body.restaurant_id
        callback(null, `${rest_id}_${t}`)
    },
})

export const storer = multer({
    storage: file_store
})