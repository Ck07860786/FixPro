const steps = [
  { number: '1', title: 'Request', text: 'Customer logs a ticket via portal or phone. Details instantly sync.' },
  { number: '2', title: 'Assign', text: 'System dispatches the optimal technician based on skill & location.' },
  { number: '3', title: 'Complete', text: 'Work is executed, notes recorded, and digital signatures captured.' },
  { number: '4', title: 'Pay', text: 'Automated invoicing triggers immediate payment collection.', isLast: true },
]

export function WorkflowSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="text-center">
        <h2 className="text-[2.3rem] tracking-[-0.06em] text-slate-900">
          Seamless workflow execution
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          From the first call to the final payment, in four simple steps.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {steps.map(({ number, title, text, isLast }) => (
          <div key={number} className="text-left">
            <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl font-bold ${
              isLast
                ? 'border-blue-600/40 text-slate-800'
                : 'border-blue-600 text-blue-600'
            }`}>
              {number}
            </div>
            <h3 className="mb-2 text-lg font-bold tracking-[-0.04em] text-slate-900">{title}</h3>
            <p className="text-sm leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
