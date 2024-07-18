import React, { useState, useEffect } from 'react';
import { User } from '../../../shared/types/User';
import '../pages/UserPage/styles.css';

interface UserFormProps {
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    deleteUser: (userId: string) => void; // Adicionei a função de deletar usuário
    editUser: User | null;
    setEditUser: (user: User | null) => void;
}

const UserForm: React.FC<UserFormProps> = ({ addUser, updateUser, deleteUser, editUser, setEditUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ddd, setDdd] = useState('');
    const [endereco, setEndereco] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        telefone: '',
        endereco: ''
    });

    useEffect(() => {
        if (editUser) {
            setName(editUser.nome);
            setEmail(editUser.email);
            setPassword(editUser.password);
            setDdd(editUser.telefone.slice(1, 3)); // Extrai o DDD do telefone
            setTelefone(editUser.telefone.slice(5)); // Extrai o número do telefone sem o DDD
            setEndereco(editUser.endereco);
        } else {
            setName('');
            setEmail('');
            setPassword('');
            setDdd('');
            setTelefone('');
            setEndereco('');
        }
    }, [editUser]);

    const validate = (): boolean => {
        let valid = true;
        const newErrors = { name: '', email: '', password: '', telefone: '', endereco: '' };

        if (!name) {
            newErrors.name = 'Nome é obrigatório';
            valid = false;
        }
        if (!email) {
            newErrors.email = 'Email é obrigatório';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email inválido';
            valid = false;
        }
        if (!password) {
            newErrors.password = 'Senha é obrigatória';
            valid = false;
        }
        if (!telefone) {
            newErrors.telefone = 'Telefone é obrigatório';
            valid = false;
        } else if (!/^\d{4,5}-\d{4}$/.test(telefone)) {
            newErrors.telefone = 'Telefone inválido. Formato esperado: XXXX-XXXX ou XXXXX-XXXX';
            valid = false;
        }
        if (!ddd) {
            newErrors.telefone = 'DDD é obrigatório';
            valid = false;
        }
        if (!endereco) {
            newErrors.endereco = 'Endereço é obrigatório';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const checkPasswordStrength = (password: string) => {
        const regex = {
            strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{6,})/
        };
        if (regex.strong.test(password)) {
            setPasswordStrength(100);
        } else if (regex.medium.test(password)) {
            setPasswordStrength(60);
        } else {
            setPasswordStrength(30);
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength === 100) return 'green';
        if (passwordStrength === 60) return 'yellow';
        return 'red';
    };

    const handleDelete = () => {
        if (editUser) {
            const confirmed = window.confirm('Tem certeza que deseja excluir este usuário?');
            if (confirmed) {
                deleteUser(editUser.id);
                setEditUser(null);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        const fullPhone = `(${ddd}) ${telefone}`;
        const user: User = { id: editUser ? editUser.id : Date.now().toString(), nome: name, email, password, telefone: fullPhone, endereco, pedidos: [] };
        if (editUser) {
            updateUser(user);
            setEditUser(null);
        } else {
            addUser(user);
        }
        setName('');
        setEmail('');
        setPassword('');
        setDdd('');
        setTelefone('');
        setEndereco('');
        setPasswordStrength(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="exemplo@dominio.com" />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                }} required />
                {errors.password && <span className="error">{errors.password}</span>}
                <progress value={passwordStrength} max="100" style={{width: 'calc(100% - 18px)', backgroundColor: getStrengthColor()}}></progress>
                <span className="strength">{passwordStrength === 100 ? 'Forte' : passwordStrength === 60 ? 'Média' : 'Fraca'}</span>
            </div>
            <div>
                <label htmlFor="ddd">DDD:</label>
                <select id="ddd" value={ddd} onChange={(e) => setDdd(e.target.value)} required>
                    <option value="">Selecione o DDD</option>
                    <optgroup label="Centro-Oeste">
                        <option value="61">61 - Distrito Federal</option>
                        <option value="62">62 - Goiás</option>
                        <option value="64">64 - Goiás</option>
                        <option value="65">65 - Mato Grosso</option>
                        <option value="66">66 - Mato Grosso</option>
                        <option value="67">67 - Mato Grosso do Sul</option>
                    </optgroup>
                    <optgroup label="Nordeste">
                        <option value="82">82 - Alagoas</option>
                        <option value="71">71 - Bahia</option>
                        <option value="73">73 - Bahia</option>
                        <option value="74">74 - Bahia</option>
                        <option value="75">75 - Bahia</option>
                        <option value="77">77 - Bahia</option>
                        <option value="85">85 - Ceará</option>
                        <option value="88">88 - Ceará</option>
                        <option value="98">98 - Maranhão</option>
                        <option value="99">99 - Maranhão</option>
                        <option value="83">83 - Paraíba</option>
                        <option value="81">81 - Pernambuco</option>
                        <option value="87">87 - Pernambuco</option>
                        <option value="86">86 - Piauí</option>
                        <option value="89">89 - Piauí</option>
                        <option value="84">84 - Rio Grande do Norte</option>
                        <option value="79">79 - Sergipe</option>
                    </optgroup>
                    <optgroup label="Norte">
                        <option value="68">68 - Acre</option>
                        <option value="96">96 - Amapá</option>
                        <option value="92">92 - Amazonas</option>
                        <option value="97">97 - Amazonas</option>
                        <option value="91">91 - Pará</option>
                        <option value="93">93 - Pará</option>
                        <option value="94">94 - Pará</option>
                        <option value="69">69 - Rondônia</option>
                        <option value="95">95 - Roraima</option>
                        <option value="63">63 - Tocantins</option>
                    </optgroup>
                    <optgroup label="Sudeste">
                        <option value="27">27 - Espírito Santo</option>
                        <option value="28">28 - Espírito Santo</option>
                        <option value="31">31 - Minas Gerais</option>
                        <option value="32">32 - Minas Gerais</option>
                        <option value="33">33 - Minas Gerais</option>
                        <option value="34">34 - Minas Gerais</option>
                        <option value="35">35 - Minas Gerais</option>
                        <option value="37">37 - Minas Gerais</option>
                        <option value="38">38 - Minas Gerais</option>
                        <option value="21">21 - Rio de Janeiro</option>
                        <option value="22">22 - Rio de Janeiro</option>
                        <option value="24">24 - Rio de Janeiro</option>
                        <option value="11">11 - São Paulo</option>
                        <option value="12">12 - São Paulo</option>
                        <option value="13">13 - São Paulo</option>
                        <option value="14">14 - São Paulo</option>
                        <option value="15">15 - São Paulo</option>
                        <option value="16">16 - São Paulo</option>
                        <option value="17">17 - São Paulo</option>
                        <option value="18">18 - São Paulo</option>
                        <option value="19">19 - São Paulo</option>
                    </optgroup>
                    <optgroup label="Sul">
                        <option value="41">41 - Paraná</option>
                        <option value="42">42 - Paraná</option>
                        <option value="43">43 - Paraná</option>
                        <option value="44">44 - Paraná</option>
                        <option value="45">45 - Paraná</option>
                        <option value="46">46 - Paraná</option>
                        <option value="51">51 - Rio Grande do Sul</option>
                        <option value="53">53 - Rio Grande do Sul</option>
                        <option value="54">54 - Rio Grande do Sul</option>
                        <option value="55">55 - Rio Grande do Sul</option>
                        <option value="47">47 - Santa Catarina</option>
                        <option value="48">48 - Santa Catarina</option>
                        <option value="49">49 - Santa Catarina</option>
                    </optgroup>
                </select>
                <label htmlFor="telefone">Telefone:</label>
                <input type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required placeholder="XXXXX-XXXX" />
                {errors.telefone && <span className="error">{errors.telefone}</span>}
            </div>
            <div>
                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                {errors.endereco && <span className="error">{errors.endereco}</span>}
            </div>
            <button type="submit">{editUser ? 'Atualizar Usuário' : 'Adicionar Usuário'}</button>
            {editUser && <button type="button" onClick={handleDelete}>Excluir Usuário</button>}
        </form>
    );
};

export default UserForm;
