function StepOne({ register, errors, countries, today }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          {...register('firstName', { required: 'First name is required.' })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Alex"
        />
        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          {...register('lastName', { required: 'Last name is required.' })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Morgan"
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address.',
            },
          })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="alex@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          {...register('phone', { required: 'Phone is required.' })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="+1 555 123 4567"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="dob">
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          max={today}
          {...register('dob', {
            required: 'Date of birth is required.',
            validate: (value) => {
              const birthDate = new Date(value)
              const todayDate = new Date()
              let age = todayDate.getFullYear() - birthDate.getFullYear()
              const monthDiff = todayDate.getMonth() - birthDate.getMonth()

              if (monthDiff < 0 || (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())) {
                age -= 1
              }

              return age >= 18 || 'You must be at least 18 years old.'
            },
          })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="country">
          Country
        </label>
        <select
          id="country"
          {...register('country', { required: 'Please select your country.' })}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
      </div>
    </div>
  )
}

export default StepOne
