import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addItem, editItem, getItemDetails } from '../../../shared/services/ItensService'
import { loadCategories } from '../../../shared/services/CategoriesService'
import { Category } from '../../../shared/types/category'

/*
  Formulario de itens.
*/
const ItemForm = ({ type="add" }) => {
  // Constantes:
  const null_form_errors = {
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  }
  const navigate = useNavigate()
  const { register, handleSubmit, formState: {} } = useForm()
  const {restaurant_id, item_id} = useParams()
  const [restaurantCategories, setRestaurantCategories] = useState<Category[]>([])
  const base64PathStart = "data:image/png;base64,"

  // Variaveis:
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const [imageBase64, setImageBase64] = useState("")

  const [imagePath, setImagePath] = useState("")
  const [formErrors, setFormErrors] = useState(null_form_errors)

  // Funcoes:
  const handleFinish = async (data) => {
    data.name = name
    data.description = description
    data.price = price
    data.categories = formatCategory(categoryOptions)
    data.image64 = imageBase64
    if (!verifyErros(data)) {
      data.restaurant_id = restaurant_id 
      let result = await addOrEdit(data)
      if (result) {
        if (result.status = 200) {
          navigate(`/${restaurant_id}/menu-editor`)
        }
        else {
          console.log(result.data.Erro)
        }
      }
      else {
        console.log("Erro")
      }
    }
  }

  // Add-Edit:
  const formTitle = () => {
    if (type == "edit") {
      return "Editar item"
    }
    else {
      return "Adicionar item"
    }
  }

  const getItemInfo = async () => {
    if (item_id) {
      let item = await getItemDetails(item_id)
      return item
    }
    return {
      id: "",
      restaurant_id: "", 
      name: "",
      price: "",
      description: "",
      categories: "",
      image64: ""
    }
  }

  const setVars = async () => {
    try {
      let info = await getItemInfo()
      setName(info.name)
      setDescription(info.description)
      setPrice(info.price)
      setImageBase64(info.image64)
      setImagePath(base64PathStart+info.image64)
      let categories_info = info.categories.split(",")
      setCategoryOptions(categories_info)
    } catch (error) {
      console.error('Error loading item info:', error);
    }
  }

  const addOrEdit = (data) => {
    if (type == "edit") {
      if (item_id) {
        return editItem(data, item_id)
      }
      else {
        return false
      }
    }
    else {
      return addItem(data)
    }
  }

  // - Verify erros:
  const verifyErros = (data) => {
    let error = false
    let newErros = null_form_errors
    newErros.name = verifyName(data.name)
    if (newErros.name != "") {
      error = true
    }
    newErros.description = verifyDescription(data.description)
    if (newErros.description != "") {
      error = true
    }
    newErros.price = verifyPrice(data.price)
    if (newErros.price != "") {
      error = true
    }
    newErros.category = verifyCategory(data.categories)
    if (newErros.category != "") {
      error = true
    }
    newErros.image = verifyImage(data.image64)
    if (newErros.image != "") {
      error = true
    }
    setFormErrors(newErros)
    return error
  }

  const verifyName = (name: string) => {
    if (name.length < 1) {
      return "Item deve ter um nome"
    }
    return ""
  }

  const verifyDescription = (description: string) => {
    if (description.length < 1) {
      return "Item deve ter uma descrição"
    } else if (description.length > 60) {
      return "Descrição não pode ter mais que 60 caracteres"
    }
    return ""
  }

  const verifyPrice = (price: string) => {
    const priceFormatRegex = /^\d{1,3}(?:\.\d{2})$/
    if (price.length < 1) {
      return "Item deve ter um preço"
    }
    else if (!priceFormatRegex.test(price)) {
      return 'Preço deve estar no formato: nnn.nn; ex: "10.00", "25.50", "3.75", "200.00, ...'
    }
    return ""
  }

  const verifyCategory = (category: string) => {
    if (category.length < 1) {
      return "Item deve ter pelo menos uma categoria"
    }
    return ""
  }

  const verifyImage = (image: string) => {
    if (image.length < 1) {
      return "Item deve ter uma imagem"
    }
    return ""
  }

  // - Category:
  const formatCategory = (category: string[]) => {
    return category.join(",")
  }

  const setCategoryCheckbox = () => {
    return (
      <div>
        {restaurantCategories.map((category, index) => (
          <label key={index}>
            <input type="checkbox" checked={categoryOptions.includes(category.name)} onChange={() => handleCheckboxChange(category.name)} />
            {category.name}
          </label>
        ))}
      </div>
      )
  }

  // - Image:
  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          // Tamanho maximo:
          const MAX_WIDTH = 400
          const MAX_HEIGHT = 400
          let width = img.width
          let height = img.height
          // Redimensiona proporcionalmente:
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            // Converte o canvas para base64
            const Base64 = canvas.toDataURL('image/jpeg')
            resolve(Base64)
          } else {
            reject(new Error('Erro ao obter contexto do canvas'))
          }
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  }

  // - Handles:
  const handleCheckboxChange = (option: string) => {
    if (categoryOptions.includes(option)) {
      setCategoryOptions(categoryOptions.filter(item => item !== option))
    } else {
      setCategoryOptions([...categoryOptions, option])
    }
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const resizedBase64 = await imageToBase64(file)
        setImagePath(resizedBase64)
        setImageBase64(resizedBase64.split(",")[1])
      } catch (error) {
        console.error('Erro ao redimensionar imagem:', error)
      }
    } else {
      setImagePath("")
      setImageBase64("")
    }
  }

  const handleCancel = () => [
    navigate(`/${restaurant_id}/menu-editor`)
  ]

  useEffect(() => {
    const fetchData = async () => {
      if (restaurant_id) {
        setVars()
        try {
          const fetchedCategories: Category[] = await loadCategories(restaurant_id)
          setRestaurantCategories(fetchedCategories)
        } catch (error) {
            console.error('Error loading categories:', error);
        }
      }
    }
    fetchData()
  }, [restaurant_id])

  return (
    <div>
      <h1>{formTitle()}</h1>
      <form onSubmit={handleSubmit(handleFinish)}>
        <div>
          <label htmlFor="fileInput">Escolher uma imagem:</label><br />
          {imagePath && <img src={imagePath} alt="Imagem selecionada" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
          <input type="file" id="fileInput" onChange={handleImageChange} accept="image/*" />
          <p>{formErrors.image}</p>
        </div>
        <div>
          <label>Nome:</label>
          <input type="text" {...register('name')} value={name} onChange={(e) => setName(e.target.value)} />
          <p>{formErrors.name}</p>
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" {...register('description')} value={description} onChange={(e) => setDescription(e.target.value)} />
          <p>{formErrors.description}</p>
        </div>
        <div>
          <label>Preço:</label>
          <input type="text" {...register('price')} value={price} onChange={(e) => setPrice(e.target.value)} />
          <p>{formErrors.price}</p>
        </div>
        <div>
          <label>Categorias:</label><br />
            {setCategoryCheckbox()}
          <p>{formErrors.category}</p>
        </div>
        <div>
          <button type="button" onClick={handleCancel}>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default ItemForm
