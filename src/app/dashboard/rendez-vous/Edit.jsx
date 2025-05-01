'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, Label, FieldGroup } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function Edit() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-2">
      <Button type="button" onClick={() => setIsOpen(true)}>
        Ajouter un événement
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Planification du rendez-vous</DialogTitle>
        <DialogDescription>
          Renseignez les informations ci-dessous pour créer un nouveau
          rendez-vous dans votre agenda.
        </DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Date du rendez-vous</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>
            <Field>
              <Label>Heure de début</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>
            <Field>
              <Label>Service</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>
            <Field>
              <Label>Prix</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>
            <Field>
              <Label>Nom du client</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>
            <Field>
              <Label>Email</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>
            <Field>
              <Label>Téléphone</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>{' '}
            <Field>
              <Label>Statut du paiement</Label>
              <Input name="amount" placeholder="$0.00" />
            </Field>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Créer le rendez-vous</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
