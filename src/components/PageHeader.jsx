// Banner-i i sipërm për faqet e brendshme
export default function PageHeader({ title, subtitle, image }) {
  return (
    <section className="page-header" style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <div className="page-header__overlay" />
      <div className="container page-header__content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
