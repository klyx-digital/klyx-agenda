'use client'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, Label, FieldGroup } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { useState, useActionState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { PickupDate } from '@/components/ui/PickupDate'
import * as Headless from '@headlessui/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Select } from '@/components/ui/select'
import { createRdv } from './action'

export function Edit() {
  const initialState = { error: {}, message: '' }
  const [state, formAction, isPending] = useActionState(createRdv, initialState)

  let [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState('')

  return (
    <div className="py-2">
      <Button type="button" onClick={() => setIsOpen(true)}>
        Ajouter un événement
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form action={formAction}>
          <DialogTitle>Planification du rendez-vous</DialogTitle>
          <DialogDescription>
            Renseignez les informations ci-dessous pour créer un nouveau
            rendez-vous dans votre agenda.
          </DialogDescription>
          <DialogBody>
            <FieldGroup>
              <Field>
                <Label>Date du rendez-vous</Label>
                <div className="grid gap-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button color="white">
                        {date ? (
                          format(date, 'EEEE d MMMM yyyy', {
                            locale: fr,
                          })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <PickupDate
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                    <input type="hidden" name="date" value={date} />
                  </Popover>
                  <Select name="heureRdv">
                    <option value="">Choisir une heure</option>
                    <option value="08:00">08:00</option>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                  </Select>
                </div>
              </Field>
              <Headless.Field className="flex items-center justify-between gap-6">
                <Label>Service</Label>
                <Input name="service" type="text" className="max-w-48" />
                <Label>Prix</Label>
                <Input name="prix" type="number" className="max-w-48" />
                <Label>Durée</Label>
                <Select name="duration">
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </Select>
              </Headless.Field>
              <Field>
                <Label>Nom du client</Label>
                <Input name="nameCLient" type="text" />
              </Field>
              <Headless.Field className="flex items-center justify-between gap-6">
                <Label>Email</Label>
                <Input name="email" type="email" />
                <Label>Téléphone</Label>
                <Input name="tel" type="tel" />
              </Headless.Field>
              <Field>
                <Label>Statut du paiement</Label>
                <Select name="paymentStatus">
                  <option value="">Sélectionner un statut</option>
                  <option value="paid">Payé</option>
                  <option value="pending">En attente de paiement</option>
                  <option value="onsite">À payer sur place</option>
                </Select>
              </Field>
            </FieldGroup>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              Créer le rendez-vous
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
