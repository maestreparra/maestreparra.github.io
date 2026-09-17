import { getHomePath, getRoutePath } from "@/i18n/routes";

export default function NotFound() {
  return (
    <main style={{ padding: "48px 32px", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Error 404 · 404 error
      </p>
      <h1>Esta ruta no forma parte del sistema. / This route is not part of the system.</h1>
      <p>
        El contenido pudo cambiar de ubicación o todavía no está publicado. The content may have
        moved or may not be published yet.
      </p>
      <p>
        <a href={getHomePath("es")}>Ir al inicio en español</a>
        {" · "}
        <a href={getHomePath("en")}>Go to English home</a>
        {" · "}
        <a href={getRoutePath("work", "es")}>Ver proyectos</a>
        {" · "}
        <a href={getRoutePath("work", "en")}>View selected work</a>
      </p>
    </main>
  );
}
