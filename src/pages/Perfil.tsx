import React, { useState, useEffect } from 'react';
import {
    User,
    Building2,
    Camera,
    Save,
    X,
    Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../style/Perfil.css';
import MenuLateral from '../components/MenuLateral';

type ProfileData = {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    empresa?: string;
    cnpj?: string;
    endereco?: string;
    avatar?: string | null;
    senha?: string;
};

type Errors = {
    nome?: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cnpj?: string;
    senhaAtual?: string;
    novaSenha?: string;
    confirmarSenha?: string;
};

export default function Perfil() {
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [profileData, setProfileData] = useState<ProfileData>({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        empresa: '',
        cnpj: '',
        endereco: '',
        avatar: null
    });

    const [editData, setEditData] = useState<ProfileData>({ ...profileData });
    const [errors, setErrors] = useState<Errors>({});

    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    useEffect(() => {
        const usuarioLogado = localStorage.getItem('usuarioLogado');
        if (usuarioLogado) {
            const usuario = JSON.parse(usuarioLogado);
            setProfileData(usuario);
            setEditData(usuario);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const resultado = reader.result;
            if (typeof resultado === 'string') {
                setEditData(prev => ({ ...prev, avatar: resultado }));
            }
        };
        reader.readAsDataURL(file);
    };

    const validateFields = (): boolean => {
        const newErrors: Errors = {};

        if (!editData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório.';
        }

        if (!editData.email.trim()) {
            newErrors.email = 'Email é obrigatório.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
            newErrors.email = 'Email inválido.';
        }

        if (!editData.telefone.trim()) {
            newErrors.telefone = 'Telefone é obrigatório.';
        } else if (!/^\d{10,11}$/.test(editData.telefone.replace(/\D/g, ''))) {
            newErrors.telefone = 'Telefone deve ter 10 ou 11 dígitos.';
        }

        if (!editData.cpf.trim()) {
            newErrors.cpf = 'CPF é obrigatório.';
        } else if (!/^\d{11}$/.test(editData.cpf.replace(/\D/g, ''))) {
            newErrors.cpf = 'CPF deve ter 11 dígitos.';
        }

        if (editData.cnpj && editData.cnpj.trim() && !/^\d{14}$/.test(editData.cnpj.replace(/\D/g, ''))) {
            newErrors.cnpj = 'CNPJ deve ter 14 dígitos.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateFields()) return;

        setProfileData(editData);
        localStorage.setItem('usuarioLogado', JSON.stringify(editData));

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const index = usuarios.findIndex((u: any) => u.email === profileData.email);
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...editData };
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        setIsEditing(false);

        const isDark = document.body.classList.contains('dark');
        Swal.fire({
            icon: 'success',
            title: 'Perfil atualizado!',
            confirmButtonText: 'OK',
            background: isDark ? '#141414' : '#ffffff',
            color: isDark ? '#e5e7eb' : '#1f2937',
            confirmButtonColor: '#7c3aed',
        });
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setErrors({});
        setIsEditing(false);
    };

    const confirmDeleteAccount = () => {
        const email = profileData.email;

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuariosAtualizados = usuarios.filter(
            (u: any) => u.email !== email
        );
        localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));

        const chaveNotas = `notas_${email}`;
        localStorage.removeItem(chaveNotas);

        localStorage.removeItem('usuarioLogado');

        navigate('/');
    };

    const handleChangePassword = () => {
        const newErrors: Errors = {};

        if (!senhaAtual) {
            newErrors.senhaAtual = 'Senha atual é obrigatória.';
        } else if (senhaAtual !== profileData.senha) {
            newErrors.senhaAtual = 'Senha atual incorreta.';
        }

        if (!novaSenha) {
            newErrors.novaSenha = 'Nova senha é obrigatória.';
        } else if (novaSenha.length < 9) {
            newErrors.novaSenha = 'A senha deve ter no mínimo 9 caracteres.';
        }
        else if (novaSenha === senhaAtual) {
            newErrors.novaSenha = 'A nova senha não pode ser igual à senha atual.';
        }

        if (!confirmarSenha) {
            newErrors.confirmarSenha = 'Confirmação de senha é obrigatória.';
        } else if (novaSenha !== confirmarSenha) {
            newErrors.confirmarSenha = 'As senhas não coincidem.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            const index = usuarios.findIndex((u: any) => u.email === profileData.email);

            if (index !== -1) {
                usuarios[index].senha = novaSenha;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                const usuarioAtualizado = { ...profileData, senha: novaSenha };
                setProfileData(usuarioAtualizado);
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
            }

            setShowPasswordModal(false);
            setSenhaAtual('');
            setNovaSenha('');
            setConfirmarSenha('');

            const isDark = document.body.classList.contains('dark');
            Swal.fire({
                icon: 'success',
                title: 'Senha alterada com sucesso!',
                confirmButtonText: 'OK',
                background: isDark ? '#141414' : '#ffffff',
                color: isDark ? '#e5e7eb' : '#1f2937',
                confirmButtonColor: '#7c3aed',
            });
        }
    };

    return (
        <MenuLateral
            currentPage="Perfil"
            nome={profileData.nome}
            email={profileData.email}
            avatar={profileData.avatar}
        >
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar-section">
                            <div className="profile-avatar">
                                {editData.avatar ? (
                                    <img
                                        src={editData.avatar}
                                        alt="Avatar"
                                        className="avatar-image"
                                    />
                                ) : (
                                    profileData.nome
                                        .split(' ')
                                        .map(n => n[0])
                                        .join('')
                                        .slice(0, 2)
                                )}
                            </div>

                            {isEditing && (
                                <label className="camera-button">
                                    <Camera className="camera-icon" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="file-input"
                                    />
                                </label>
                            )}
                        </div>

                        <div className="profile-main-info">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={editData.nome}
                                        onChange={handleInputChange}
                                        className="edit-name-input"
                                    />
                                    {errors.nome && <p className="error-text">{errors.nome}</p>}
                                </>
                            ) : (
                                <h1 className="profile-name">{profileData.nome}</h1>
                            )}
                        </div>
                    </div>

                    <div className="profile-details">
                        <h2 className="section-title">
                            <User className="section-icon" />
                            Informações Pessoais
                        </h2>

                        <div className="info-grid">
                            <div className="info-field">
                                <label className="field-label">
                                    Email <span className='error-text'>*</span>
                                </label>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleInputChange}
                                            className="field-input"
                                        />
                                        {errors.email && <p className="error-text">{errors.email}</p>}
                                    </>
                                ) : (
                                    <p className="field-value">{profileData.email}</p>
                                )}
                            </div>

                            <div className="info-field">
                                <label className="field-label">
                                    CPF <span className='error-text'>*</span>
                                </label>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            name="cpf"
                                            value={editData.cpf}
                                            onChange={handleInputChange}
                                            className="field-input"
                                        />
                                        {errors.cpf && <p className="error-text">{errors.cpf}</p>}
                                    </>
                                ) : (
                                    <p className="field-value">{profileData.cpf}</p>
                                )}
                            </div>

                            <div className="info-field">
                                <label className="field-label">
                                    Telefone <span className='error-text'>*</span>
                                </label>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={editData.telefone}
                                            onChange={handleInputChange}
                                            className="field-input"
                                        />
                                        {errors.telefone && <p className="error-text">{errors.telefone}</p>}
                                    </>
                                ) : (
                                    <p className="field-value">{profileData.telefone}</p>
                                )}
                            </div>
                        </div>

                        <h2 className="section-title section-title-spacing">
                            <Building2 className="section-icon" />
                            Informações Opcionais
                        </h2>

                        <div className="info-grid">
                            <div className="info-field">
                                <label className="field-label-simple">
                                    Empresa
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="empresa"
                                        value={editData.empresa}
                                        onChange={handleInputChange}
                                        className="field-input"
                                    />
                                ) : (
                                    <p className="field-value">{profileData.empresa || '-'}</p>
                                )}
                            </div>

                            <div className="info-field">
                                <label className="field-label-simple">
                                    CNPJ
                                </label>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            name="cnpj"
                                            value={editData.cnpj}
                                            onChange={handleInputChange}
                                            className="field-input"
                                        />
                                        {errors.cnpj && <p className="error-text">{errors.cnpj}</p>}
                                    </>
                                ) : (
                                    <p className="field-value">{profileData.cnpj || '-'}</p>
                                )}
                            </div>

                            <div className="info-field">
                                <label className="field-label">
                                    Endereço
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="endereco"
                                        value={editData.endereco}
                                        onChange={handleInputChange}
                                        className="field-input"
                                    />
                                ) : (
                                    <p className="field-value">{profileData.endereco || '-'}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="action-buttons">
                                <button onClick={handleCancel} className="cancel-button">
                                    <X className="button-icon" />
                                    Cancelar
                                </button>
                                <button onClick={handleSave} className="save-button">
                                    <Save className="button-icon" />
                                    Salvar Alterações
                                </button>
                            </div>
                        )}

                        {!isEditing && (
                            <div className="profile-header-buttons">
                                <button onClick={() => setIsEditing(true)} className="edit-button">
                                    Editar Perfil
                                </button>

                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="change-password-button"
                                >
                                    <Lock size={18} />
                                    Alterar Senha
                                </button>

                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="delete-account-button"
                                >
                                    Deletar Conta
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="modal password-modal">
                        <h3 className="modal-title">Alterar Senha</h3>

                        <div className="password-fields">
                            <div className="info-field">
                                <label className="field-label">Senha Atual</label>
                                <input
                                    type="password"
                                    value={senhaAtual}
                                    onChange={(e) => setSenhaAtual(e.target.value)}
                                    className="field-input"
                                />
                                {errors.senhaAtual && <p className="error-text">{errors.senhaAtual}</p>}
                            </div>

                            <div className="info-field">
                                <label className="field-label">Nova Senha</label>
                                <input
                                    type="password"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    className="field-input"
                                />
                                {errors.novaSenha && <p className="error-text">{errors.novaSenha}</p>}
                            </div>

                            <div className="info-field">
                                <label className="field-label">Confirmar Nova Senha</label>
                                <input
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    className="field-input"
                                />
                                {errors.confirmarSenha && <p className="error-text">{errors.confirmarSenha}</p>}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setSenhaAtual('');
                                    setNovaSenha('');
                                    setConfirmarSenha('');
                                    setErrors({});
                                }}
                                className="modal-cancel"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="modal-confirm"
                            >
                                Alterar Senha
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal danger">
                        <h3 className="modal-title">Deletar conta</h3>
                        <p className="modal-text">
                            Tem certeza que deseja deletar sua conta?
                            <br />
                            <strong>Essa ação não pode ser desfeita.</strong>
                        </p>

                        <div className="modal-actions">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="modal-cancel"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDeleteAccount}
                                className="modal-confirm danger"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MenuLateral>
    );
}