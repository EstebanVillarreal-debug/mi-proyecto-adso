import mongoose from 'mongoose';
import { config } from '../config/environment.js';

const { Schema } = mongoose;

export const CONTENT_TYPES = ['banner', 'service', 'testimonial', 'stat', 'event'];
export const CONTENT_CATEGORIES = ['software', 'agroindustria', 'seguridad', 'innovacion'];

// Solo https://... o rutas internas que empiecen por "/".
// Bloquea enlaces "javascript:alert(1)", que en un <a href> del frontend serían XSS,
// y "//otro-dominio.com" (empieza por "/" pero el navegador lo trata como dominio externo).
const HTTPS_URL = /^https:\/\/\S+$/;
const SAFE_LINK = /^(https:\/\/\S+|\/(?!\/)[\w\-./]*)$/;

// -----------------------------------------------------------------------------
// 1. Esquema base: lo que comparten TODOS los contenidos
// -----------------------------------------------------------------------------
const ContentSchema = new Schema(
    {
        // true = publicado en la Landing · false = borrador (por defecto, nada se publica solo)
        active: { type: Boolean, default: false },
        tags: {
            type: [{ type: String, trim: true, lowercase: true, maxlength: [30, 'Cada etiqueta admite máximo 30 caracteres.'] }],
            default: undefined,
            validate: { validator: (tags) => tags.length <= 10, message: 'Máximo 10 etiquetas por contenido.' }
        }
    },
    {
        discriminatorKey: 'type',   // El campo que distingue banner, service, testimonial...
        collection: 'contents',     // La misma colección creada en la Sesión 07
        timestamps: true,           // createdAt y updatedAt automáticos
        strict: true,               // Campos no declarados en el esquema se descartan
        autoIndex: !config.isProduction // En producción los índices se crean con scripts, no al arrancar
    }
);

// Índices: mismos nombres y opciones que el script 01_adso_polyglot_setup.js (Sesión 07).
// Si los nombres no coincidieran, MongoDB rechazaría el índice "duplicado".
ContentSchema.index({ active: 1, priority: 1 }, { name: 'idx_active_priority' });
ContentSchema.index({ type: 1, active: 1 }, { name: 'idx_type_active' });
ContentSchema.index({ code: 1 }, { unique: true, sparse: true, name: 'idx_unique_service_code' });
ContentSchema.index({ category: 1 }, { sparse: true, name: 'idx_category' });
ContentSchema.index(
    { title: 'text', name: 'text', tags: 'text', description: 'text' },
    { name: 'idx_fulltext_search', default_language: 'spanish' }
);

export const Content = mongoose.model('Content', ContentSchema);