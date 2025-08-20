'use client';

export default function LearnMoreButton() {
  const handleClick = () => {
    const section = document.getElementById('academy-overview');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
    >
      <i className="fas fa-info-circle mr-2" />
      Learn More
    </button>
  );
} 