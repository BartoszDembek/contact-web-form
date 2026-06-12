function StepThree({ register, errors, messageLength }) {
  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          {...register('subject', { required: 'Subject is required.' })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="How can we help?"
        />
        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows="6"
          {...register('message', {
            required: 'Message is required.',
            maxLength: {
              value: 500,
              message: 'Message must be 500 characters or less.',
            },
          })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Write your message here..."
        />
        <div className="mt-2 flex items-center justify-between text-sm">
          <p className="text-slate-500">Share any details that will help us respond.</p>
          <p className={messageLength > 500 ? 'text-red-600' : 'text-slate-500'}>
            {messageLength}/500
          </p>
        </div>
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="flex items-start gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            {...register('termsAccepted', {
              validate: (value) => value || 'You must accept the terms and conditions.',
            })}
            className="mt-1"
          />
          <span>
            I agree to the Terms & Conditions and consent to being contacted regarding this enquiry.
          </span>
        </label>
        {errors.termsAccepted && <p className="mt-2 text-sm text-red-600">{errors.termsAccepted.message}</p>}
      </div>
    </div>
  )
}

export default StepThree
