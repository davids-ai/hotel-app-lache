# Instrucciones para configurar Supabase

## 1. Crear la tabla en Supabase

1. Ve a tu proyecto en [Supabase](https://app.supabase.com)
2. En el panel izquierdo, ve a **SQL Editor**
3. Haz clic en **New Query**
4. Copia y pega el contenido del archivo `scripts/create-rooms-table.sql`
5. Haz clic en **Run** para ejecutar el script

## 2. Ejecutar la aplicación localmente

```bash
npm run dev
```

La aplicación ahora guardará todos los datos en Supabase en lugar de localStorage.

## 3. Las variables de entorno ya están configuradas

El archivo `.env.local` ya contiene:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

## 4. Funcionalidad

- ✅ Se cargan las habitaciones desde Supabase al abrir cada piso
- ✅ Se guardan los cambios (estado, nombre, teléfono, modificado por) en Supabase
- ✅ Si Supabase no está disponible, usa localStorage como fallback
- ✅ Los cambios se sincronizan automáticamente

## 5. Desplegar en Vercel

1. En Vercel, ve a los **Environment Variables** del proyecto
2. Agrega las mismas variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
3. Redeploy

¡Listo! Tu aplicación estará conectada a Supabase.
