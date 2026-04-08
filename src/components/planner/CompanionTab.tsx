export default function CompanionTab() {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div
        className="w-28 h-28 rounded-3xl mb-6 flex items-center justify-center"
        style={{ background: "var(--warm-beige)" }}
      >
        <span className="text-5xl" style={{ opacity: 0.35 }}>?</span>
      </div>

      <p className="text-xl font-semibold mb-2" style={{ color: "var(--warm-brown)" }}>
        Выбери своего компаньона
      </p>
      <p
        className="text-sm leading-relaxed max-w-xs"
        style={{ color: "var(--warm-terra)", opacity: 0.7 }}
      >
        Здесь появится твой личный помощник — маскот, который будет поддерживать тебя каждый день
      </p>

      <div
        className="mt-8 px-5 py-3 rounded-2xl text-sm font-medium"
        style={{
          background: "var(--warm-beige)",
          color: "var(--warm-terra)",
          border: "1.5px dashed var(--warm-sand)",
        }}
      >
        Скоро здесь будут компаньоны
      </div>
    </div>
  );
}
