import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  country: '',
  enquiryType: 'Personal',
  companyName: '',
  employees: '',
  subject: '',
  message: '',
  termsAccepted: false,
}

function App() {
  const [countries, setCountries] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: initialForm,
  })

  const today = new Date().toISOString().split('T')[0]
  const firstName = watch('firstName', '')
  const enquiryType = watch('enquiryType', 'Personal')
  const message = watch('message', '')
  const showCompanyFields = enquiryType === 'Business' || enquiryType === 'Partnership'

  useEffect(() => {
    if (!showCompanyFields) {
      setValue('companyName', '')
      setValue('employees', '')
    }
  }, [showCompanyFields, setValue])

  const onSubmit = (data) => {
    if (currentStep === 1) {
      setCurrentStep(2)
      return
    }

    if (currentStep === 2) {
      setCurrentStep(3)
      return
    }

    setSubmitted(true)
    console.log(data)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Step {currentStep} of 3
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            {currentStep === 1
              ? 'Personal Information'
              : currentStep === 2
                ? 'Enquiry Type & Conditional Fields'
                : 'Message & Consent'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {currentStep === 1
              ? 'Please complete your personal details to continue.'
              : currentStep === 2
                ? 'Choose the nature of your enquiry and add company details when needed.'
                : 'Add your message and confirm your consent before submitting.'}
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {currentStep === 1 ? (
            <StepOne register={register} errors={errors} countries={countries} today={today} />
          ) : currentStep === 2 ? (
            <StepTwo register={register} errors={errors} showCompanyFields={showCompanyFields} />
          ) : (
            <StepThree register={register} errors={errors} messageLength={message.length} />
          )}

          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {currentStep === 1
                ? 'All required fields must be completed before moving to the next step.'
                : currentStep === 2
                  ? 'Select the enquiry type and add company details when relevant.'
                  : 'Review your message and confirm your consent to continue.'}
            </p>
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                {currentStep === 3 ? 'Submit' : 'Continue'}
              </button>
            </div>
          </div>
        </form>

        {submitted && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 shadow-sm">
            <h2 className="text-lg font-semibold">Form completed</h2>
            <p className="mt-2 text-sm">
              Thanks, {firstName || 'there'}! Your request has been submitted successfully.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
