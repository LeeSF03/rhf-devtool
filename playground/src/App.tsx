import { useEffect, useState } from "react"

import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import { DevTool } from "../../src/index"
import { FormValues, defaultLink, defaultValues } from "./form"
import "./style.css"

function App() {
  const methods = useForm<FormValues>({
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = methods
  const [submitted, setSubmitted] = useState<FormValues | null>(null)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  })

  const onSubmit = (values: FormValues) => {
    setSubmitted(values)
  }

  return (
    <FormProvider {...methods}>
      <main className="app-shell">
        <h1>RHF Devtool Test Form</h1>
        <p className="subtitle">
          Includes primitive inputs, nested object values, and a field array.
        </p>

        <form
          className="form-grid"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <section className="card">
            <h2>Profile (Object)</h2>
            <label>
              First name
              <input
                type="text"
                {...register("profile.firstName", {
                  required: "First name is required",
                })}
              />
            </label>
            {errors.profile?.firstName ? (
              <p className="error">{errors.profile.firstName.message}</p>
            ) : null}

            <label>
              Last name
              <input type="text" {...register("profile.lastName")} />
            </label>

            <label>
              Email
              <input
                type="email"
                {...register("profile.email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </label>
            {errors.profile?.email ? (
              <p className="error">{errors.profile.email.message}</p>
            ) : null}

            <label>
              Password
              <input
                type="password"
                {...register("profile.password", {
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                })}
              />
            </label>

            <label>
              Bio
              <textarea rows={3} {...register("profile.bio")} />
            </label>

            <label>
              Phone
              <input type="tel" {...register("profile.phone")} />
            </label>

            <label>
              Website
              <input type="url" {...register("profile.website")} />
            </label>

            <label>
              Search term
              <input type="search" {...register("profile.searchTerm")} />
            </label>

            <label>
              Favorite color
              <input type="color" {...register("profile.favoriteColor")} />
            </label>

            <label>
              Avatar file
              <input type="file" {...register("profile.avatar")} />
            </label>

            <input type="hidden" {...register("profile.referralCode")} />
          </section>

          <section className="card">
            <h2>Schedule</h2>
            <label>
              Birth date
              <input type="date" {...register("schedule.birthDate")} />
            </label>

            <label>
              Meeting time
              <input type="time" {...register("schedule.meetingTime")} />
            </label>

            <label>
              Reminder at
              <input
                type="datetime-local"
                {...register("schedule.reminderAt")}
              />
            </label>

            <label>
              Start month
              <input type="month" {...register("schedule.startMonth")} />
            </label>

            <label>
              Planning week
              <input type="week" {...register("schedule.planningWeek")} />
            </label>
          </section>

          <section className="card">
            <h2>Metrics (Nested Numbers)</h2>
            <label>
              Age
              <input
                type="number"
                {...register("metrics.age", { valueAsNumber: true })}
              />
            </label>

            <label>
              Salary
              <input
                type="number"
                step="0.01"
                {...register("metrics.salary", { valueAsNumber: true })}
              />
            </label>

            <label>
              Satisfaction (range)
              <input
                type="range"
                min={0}
                max={100}
                {...register("metrics.satisfaction", { valueAsNumber: true })}
              />
            </label>
          </section>

          <section className="card">
            <h2>Preferences</h2>
            <label>
              Role
              <select {...register("preferences.role")}>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            </label>

            <fieldset>
              <legend>Contact method (radio)</legend>
              <label>
                <input
                  type="radio"
                  value="email"
                  {...register("preferences.contactMethod")}
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  value="phone"
                  {...register("preferences.contactMethod")}
                />
                Phone
              </label>
              <label>
                <input
                  type="radio"
                  value="none"
                  {...register("preferences.contactMethod")}
                />
                None
              </label>
            </fieldset>

            <fieldset>
              <legend>Skills (checkbox array)</legend>
              <label>
                <input
                  type="checkbox"
                  value="typescript"
                  {...register("preferences.skills")}
                />
                TypeScript
              </label>
              <label>
                <input
                  type="checkbox"
                  value="css"
                  {...register("preferences.skills")}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  value="testing"
                  {...register("preferences.skills")}
                />
                Testing
              </label>
            </fieldset>

            <label>
              Frameworks (multiple select)
              <select multiple {...register("preferences.frameworks")}>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="svelte">Svelte</option>
                <option value="solid">Solid</option>
              </select>
            </label>

            <fieldset>
              <legend>Notifications (nested object)</legend>
              <label>
                <input
                  type="checkbox"
                  {...register("preferences.notifications.email")}
                />
                Email
              </label>
              <label>
                <input
                  type="checkbox"
                  {...register("preferences.notifications.sms")}
                />
                SMS
              </label>
              <label>
                <input
                  type="checkbox"
                  {...register("preferences.notifications.push")}
                />
                Push
              </label>
            </fieldset>

            <label>
              <input type="checkbox" {...register("preferences.newsletter")} />
              Subscribe to newsletter
            </label>

            <label>
              <input
                type="checkbox"
                {...register("preferences.termsAccepted", {
                  validate: (checked) => checked || "Accept terms to submit",
                })}
              />
              Accept terms
            </label>
            {errors.preferences?.termsAccepted ? (
              <p className="error">
                {errors.preferences.termsAccepted.message}
              </p>
            ) : null}
          </section>

          <section className="card">
            <h2>Address (Deep Object)</h2>
            <label>
              Street
              <input type="text" {...register("address.street")} />
            </label>
            <label>
              City
              <input type="text" {...register("address.city")} />
            </label>
            <label>
              State
              <input type="text" {...register("address.state")} />
            </label>
            <label>
              Postal code
              <input type="text" {...register("address.postalCode")} />
            </label>

            <label>
              Latitude
              <input
                type="number"
                step="0.000001"
                {...register("address.geo.lat", { valueAsNumber: true })}
              />
            </label>
            <label>
              Longitude
              <input
                type="number"
                step="0.000001"
                {...register("address.geo.lng", { valueAsNumber: true })}
              />
            </label>
          </section>

          <section className="card">
            <div className="array-header">
              <h2>Links (Field Array + Nested Object)</h2>
              <button
                className="btn"
                type="button"
                onClick={() => append(defaultLink())}
              >
                Add link
              </button>
            </div>

            {fields.map((field, index) => (
              <article key={field.id} className="array-item">
                <label>
                  Label
                  <input
                    type="text"
                    {...register(`links.${index}.label`, {
                      required: "Label is required",
                    })}
                  />
                </label>

                <label>
                  URL
                  <input
                    type="url"
                    {...register(`links.${index}.url`, {
                      required: "URL is required",
                    })}
                  />
                </label>

                <label>
                  Category
                  <select {...register(`links.${index}.meta.category`)}>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="social">Social</option>
                  </select>
                </label>

                <label>
                  Created at
                  <input
                    type="date"
                    {...register(`links.${index}.meta.createdAt`)}
                  />
                </label>

                <label>
                  <input
                    type="checkbox"
                    {...register(`links.${index}.primary`)}
                  />
                  Primary link
                </label>

                <button
                  className="btn"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </article>
            ))}
          </section>

          <section className="actions">
            <button className="btn" type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Reset
            </button>
          </section>
        </form>

        <section className="card result">
          <h2>Submitted Values</h2>
          <pre>
            {submitted ? JSON.stringify(submitted, null, 2) : "No submit yet."}
          </pre>
        </section>
      </main>
      <DevTool />
    </FormProvider>
  )
}

export { App }
