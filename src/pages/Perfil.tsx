import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, MapPin, Camera, Save, X, FileText } from 'lucide-react';
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
};

export default function Perfil() {
    const [isEditing, setIsEditing] = useState(false);
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
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const resultado = reader.result;
                if (typeof resultado === 'string') {
                    setEditData(prev => ({ ...prev, avatar: resultado }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setProfileData(editData);

        localStorage.setItem('usuarioLogado', JSON.stringify(editData));

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const index = usuarios.findIndex((u: any) => u.email === profileData.email);
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...editData };
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setIsEditing(false);
    };

    return (
        <MenuLateral currentPage="Perfil">
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar-section">
                            <div className="profile-avatar">
                                {editData.avatar ? (
                                    <img src={editData.avatar} alt="Avatar" className="avatar-image" />
                                ) : (
                                    profileData.nome.split(' ').map(n => n[0]).join('').slice(0, 2)
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
                                <input
                                    type="text"
                                    name="nome"
                                    value={editData.nome}
                                    onChange={handleInputChange}
                                    className="edit-name-input"
                                />
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
                                    <Mail className="label-icon" />
                                    Email
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                        className="field-input"
                                    />
                                ) : (
                                    <p className="field-value">{profileData.email}</p>
                                )}
                            </div>
                            <div className="info-field">
                                <label className="field-label">
                                    <FileText className="label-icon" />
                                    CPF
                                </label>
                                <p className="field-value">{profileData.cpf}</p>
                            </div>
                            <div className="info-field">
                                <label className="field-label">
                                    <Phone className="label-icon" />
                                    Telefone
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="telefone"
                                        value={editData.telefone}
                                        onChange={handleInputChange}
                                        className="field-input"
                                    />
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
                                <label className="field-label-simple">Empresa</label>
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
                                <label className="field-label-simple">CNPJ</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="cnpj"
                                        value={editData.cnpj}
                                        onChange={handleInputChange}
                                        className="field-input"
                                    />
                                ) : (
                                    <p className="field-value">{profileData.cnpj || '-'}</p>
                                )}
                            </div>
                            <div className="info-field">
                                <label className="field-label">
                                    <MapPin className="label-icon" />
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MenuLateral>
    );
}