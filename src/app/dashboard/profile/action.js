'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

const infoEntrepriseSchema = z.object({
  name: z.string().optional(),
  about: z.string().optional(),
})

export async function infoEntreprise(state, formData) {
  const session = await auth()
  const userId = session.user?.id

  if (!userId) {
    throw new Error('Utilisateur non authentifier')
  }

  const validatedFields = infoEntrepriseSchema.safeParse({
    name: formData.get('name'),
    about: formData.get('about'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Certains champs sont manquants ou invalides. Impossible de mettre à jour les informations.',
    }
  }

  const { name, about } = validatedFields.data

  try {
    const updateData = {}
    if (name) updateData.businessName = name
    if (about) updateData.bio = about

    if (Object.keys(updateData).length === 0) {
      return { message: 'Aucune donnée à mettre à jour.' }
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    })
    return { errors: {}, message: 'Informations mises à jour avec succès.' }
  } catch (error) {
    console.error(error)
    return {
      message:
        "Une erreur est survenue lors de la mise à jour des informations de l'entreprise.",
    }
  }
}

const LocalisationSchema = z.object({
  addressLine1: z.string().optional(),
  postalCode: z.coerce.number().optional(),
  city: z.string().optional(),
})

export async function LocalisationEntreprise(state, formData) {
  const session = await auth()
  const userId = session.user?.id

  if (!userId) {
    throw new Error('Utilisateur non authorisée')
  }

  const validatedFields = LocalisationSchema.safeParse({
    addressLine1: formData.get('streetaddress'),
    postalCode: formData.get('postalcode'),
    city: formData.get('city'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Veuillez remplir tous les champs requis pour la localisation.',
    }
  }

  const { addressLine1, postalCode, city } = validatedFields.data

  try {
    const updateData = {}
    if (addressLine1) updateData.addressLine1 = addressLine1
    if (postalCode) updateData.postalCode = postalCode
    if (city) updateData.city = city

    if (Object.keys(updateData).length === 0) {
      return { message: 'Aucune donnée à mettre à jour.' }
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    })

    return { message: 'Localisation mise à jour avec succès.' }
  } catch (error) {
    console.error(error)
    return {
      message:
        'Impossible de mettre à jour la localisation. Veuillez réessayer plus tard.',
    }
  }
}

const horairesSchema = z.object({
  lundi_start: z.string().optional(),
  lundi_end: z.string().optional(),
  mardi_start: z.string().optional(),
  mardi_end: z.string().optional(),
  mercredi_start: z.string().optional(),
  mercredi_end: z.string().optional(),
  jeudi_start: z.string().optional(),
  jeudi_end: z.string().optional(),
  vendredi_start: z.string().optional(),
  vendredi_end: z.string().optional(),
  samedi_start: z.string().optional(),
  samedi_end: z.string().optional(),
  dimanche_start: z.string().optional(),
  dimanche_end: z.string().optional(),
})

export async function updateHoraires(state, formData) {
  const session = await auth()
  const userId = session.user?.id

  if (!userId) {
    throw new Error('Utilisateur non authentifié')
  }

  const validatedFields = horairesSchema.safeParse({
    lundi_start: formData.get('lundi-start'),
    lundi_end: formData.get('lundi-end'),
    mardi_start: formData.get('mardi-start'),
    mardi_end: formData.get('mardi-end'),
    mercredi_start: formData.get('mercredi-start'),
    mercredi_end: formData.get('mercredi-end'),
    jeudi_start: formData.get('jeudi-start'),
    jeudi_end: formData.get('jeudi-end'),
    vendredi_start: formData.get('vendredi-start'),
    vendredi_end: formData.get('vendredi-end'),
    samedi_start: formData.get('samedi-start'),
    samedi_end: formData.get('samedi-end'),
    dimanche_start: formData.get('dimanche-start'),
    dimanche_end: formData.get('dimanche-end'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Certains horaires sont invalides. Veuillez vérifier les champs saisis.',
    }
  }

  const horaires = validatedFields.data

  try {
    const jours = [
      'dimanche',
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
    ]

    const enumDays = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ]

    for (let i = 0; i < jours.length; i++) {
      const jour = jours[i]
      const startKey = `${jour}_start`
      const endKey = `${jour}_end`

      if (horaires[startKey] && horaires[endKey]) {
        await prisma.availability.upsert({
          where: {
            userId_dayOfWeek: {
              userId,
              dayOfWeek: enumDays[i],
            },
          },
          update: {
            startTime: horaires[startKey],
            endTime: horaires[endKey],
          },
          create: {
            userId,
            dayOfWeek: enumDays[i],
            startTime: horaires[startKey],
            endTime: horaires[endKey],
          },
        })
      }
    }

    return { message: 'Horaires mis à jour avec succès.' }
  } catch (error) {
    console.error(error)
    return {
      message: 'Une erreur est survenue lors de la sauvegarde des horaires.',
    }
  }
}

const serviceSchema = z.object({
  servicename: z.string().min(1, 'Le nom du service est requis'),
  serviceduration: z.coerce
    .number()
    .min(1, 'La durée doit être supérieure à 0'),
  serviceprice: z.coerce.number().min(0, 'Le prix doit être positif'),
  servicedescription: z.string().optional(),
})

export async function updateService(state, formData) {
  const session = await auth()
  const userId = session.user?.id

  if (!userId) {
    throw new Error('Utilisateur non authentifié')
  }

  const validatedFields = serviceSchema.safeParse({
    servicename: formData.get('servicename'),
    serviceduration: formData.get('serviceduration'),
    serviceprice: formData.get('serviceprice'),
    servicedescription: formData.get('servicedescription'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Certains champs du service sont invalides. Veuillez les corriger.',
    }
  }

  const { servicename, serviceduration, serviceprice, servicedescription } =
    validatedFields.data

  try {
    await prisma.service.create({
      data: {
        name: servicename,
        duration: serviceduration,
        price: serviceprice,
        description: servicedescription || '',
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return { message: 'Service enregistré avec succès.' }
  } catch (error) {
    console.error(error)
    return {
      message:
        "Une erreur est survenue lors de l'enregistrement du service. Veuillez réessayer.",
    }
  }
}

const reseauxSchema = z.object({
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  tiktok: z.string().url().optional(),
  website: z.string().url().optional(),
})

export async function updateLinks(state, formData) {
  const session = await auth()
  const userId = session.user?.id

  if (!userId) {
    throw new Error('Utilisateur non authentifié')
  }

  // Schéma Zod pour les liens sociaux et site web
  const rawFields = {
    facebook: formData.get('facebook'),
    instagram: formData.get('instagram'),
    linkedin: formData.get('linkedin'),
    tiktok: formData.get('tiktok'),
    website: formData.get('website'),
  }

  // Ne garde que les champs non vides
  const filteredFields = Object.fromEntries(
    Object.entries(rawFields).filter(
      ([_, value]) => value && value.trim() !== '',
    ),
  )

  // Validation des champs non vides
  const validatedFields = reseauxSchema.safeParse(filteredFields)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Certains liens sont invalides.',
    }
  }

  const data = validatedFields.data

  // Construction dynamique des données à mettre à jour
  const updateData = {}

  if (data.website) {
    updateData.website = data.website
  }

  // Regrouper les liens sociaux dans un objet séparé
  const socialLinks = {}

  if (data.facebook) socialLinks.facebook = data.facebook
  if (data.instagram) socialLinks.instagram = data.instagram
  if (data.linkedin) socialLinks.linkedin = data.linkedin
  if (data.tiktok) socialLinks.tiktok = data.tiktok

  if (Object.keys(socialLinks).length > 0) {
    updateData.socialLinks = socialLinks
  }

  if (Object.keys(updateData).length === 0) {
    return {
      message: 'Aucune donnée à mettre à jour.',
    }
  }

  // Met à jour uniquement les données présentes
  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  })

  return { message: 'Liens mis à jour avec succès.' }
}

const coordonneesSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  addressLine1: z.string().optional(),
  postalCode: z.coerce.number().optional(),
  city: z.string().optional(),
})

export async function updateCoordonnees(state, formData) {
  const session = await auth()
  const userId = session.user?.id

  if (!userId) {
    throw new Error('Utilisateur non authentifié')
  }

  const validatedFields = coordonneesSchema.safeParse({
    phone: formData.get('phone'),
    email: formData.get('email'),
    addressLine1: formData.get('streetaddress'),
    postalCode: formData.get('postalcode'),
    city: formData.get('city'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Certains champs sont incorrects. Veuillez vérifier vos coordonnées.',
    }
  }

  const { phone, email, addressLine1, postalCode, city } = validatedFields.data

  try {
    const updateData = {}
    if (phone) updateData.phone = phone
    if (email) updateData.email = email
    if (addressLine1) updateData.addressLine1 = addressLine1
    if (postalCode) updateData.postalCode = postalCode
    if (city) updateData.city = city

    if (Object.keys(updateData).length === 0) {
      return { message: 'Aucune donnée à mettre à jour.' }
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    })

    return { message: 'Coordonnées mises à jour avec succès.' }
  } catch (error) {
    console.error(error)
    return {
      message:
        'Une erreur est survenue lors de la mise à jour de vos coordonnées.',
    }
  }
}

export async function saveLogoOrBanner(prevState, formData) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return {
      error: 'Utilisateur non authentifié',
      errors: {},
    }
  }

  const logo = formData.get('logo')
  const banner = formData.get('banner')

  const logoUrl = typeof logo === 'string' ? logo : null
  const bannerUrl = typeof banner === 'string' ? banner : null

  if (!logoUrl && !bannerUrl) {
    return {
      error: 'Aucune image valide fournie.',
      errors: {},
    }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(logoUrl && { logoImage: logoUrl }),
        ...(bannerUrl && { bannerImage: bannerUrl }),
      },
    })

    return {
      message: 'Image enregistrée avec succès.',
      errors: {},
    }
  } catch (e) {
    console.error(e)
    return {
      error: 'Erreur lors de l’enregistrement.',
      errors: {},
    }
  }
}
