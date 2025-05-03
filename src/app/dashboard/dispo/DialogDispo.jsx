import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, Label, FieldGroup, Fieldset } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { useState, useActionState } from 'react'
import { Checkbox, CheckboxField } from '@/components/ui/checkbox'
import { saveAvailability } from './action'

export function DialogDispo() {
  const initialeState = { message: {}, error: {} }
  const [state, formAction, isPending] = useActionState(
    saveAvailability,
    initialeState,
  )
  let [isOpen, setIsOpen] = useState(false)
  let [fermee, setFermee] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Mes disponibilités
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <Fieldset>
          <form action={formAction}>
            <DialogTitle>Mes disponibilités</DialogTitle>
            <DialogDescription>
              Ajoutez ou modifiez vos heures d&apos;ouverture pour chaque jour.
            </DialogDescription>
            <DialogBody>
              <div className="flex flex-col gap-4">
                {[
                  'lundi',
                  'mardi',
                  'mercredi',
                  'jeudi',
                  'vendredi',
                  'samedi',
                  'dimanche',
                ].map((day) => (
                  <div key={day} className="flex flex-col gap-2">
                    <FieldGroup>
                      <Field>
                        <Label>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            name={`${day}_start`}
                            className="w-32"
                            disabled={!!fermee[day]}
                          />
                          <span>à</span>
                          <Input
                            type="time"
                            name={`${day}_end`}
                            className="w-32"
                            disabled={!!fermee[day]}
                          />

                          <CheckboxField>
                            <Checkbox
                              checked={!!fermee[day]}
                              onChange={(checked) =>
                                setFermee((prev) => ({
                                  ...prev,
                                  [day]: checked,
                                }))
                              }
                            />
                            <Label>Fermé</Label>
                          </CheckboxField>
                        </div>
                      </Field>
                    </FieldGroup>
                  </div>
                ))}
              </div>
            </DialogBody>
            <DialogActions>
              <Button plain onClick={() => setIsOpen(false)}>
                Fermer
              </Button>
              <Button type="submit" onClick={() => setIsOpen(false)}>
                Enregistrer
              </Button>
            </DialogActions>
          </form>
        </Fieldset>
      </Dialog>
    </>
  )
}
