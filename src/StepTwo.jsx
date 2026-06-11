function StepTwo({ register, errors, showCompanyFields }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="enquiryType">
          Enquiry Type
        </label>
        <select
          id="enquiryType"
          {...register('enquiryType', { required: 'Please select an enquiry type.' })}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
          <option value="Partnership">Partnership</option>
          <option value="Other">Other</option>
        </select>
        {errors.enquiryType && <p className="mt-1 text-sm text-red-600">{errors.enquiryType.message}</p>}
      </div>

      {showCompanyFields && (
        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="companyName">
                Company Name
              </label>
              <input
                id="companyName"
                {...register('companyName', {
                  validate: (value) =>
                    showCompanyFields
                      ? value.trim()
                        ? true
                        : 'Company name is required.'
                      : true,
                })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Northwind Labs"
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="employees">
                Number of Employees
              </label>
              <input
                id="employees"
                type="number"
                min="1"
                {...register('employees', {
                  validate: (value) =>
                    showCompanyFields
                      ? value && Number(value) > 0
                        ? true
                        : 'Enter at least 1 employee.'
                      : true,
                })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="25"
              />
              {errors.employees && <p className="mt-1 text-sm text-red-600">{errors.employees.message}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepTwo
