const BrandCard = ({ option, className, handleBrandChange, selected }) => {
  return (
    <div 
      className={`w-52 h-44 flex-shrink-0 bg-white border group 
      ${selected ? 'border-[#1a77bd]' : 'border-gray-300'} 
      hover:border-[#1a77bd] transform-3d transition-all rounded-2xl duration-300 
      flex flex-col items-center justify-center gap-4 ${className || ''}`} 
      onClick={handleBrandChange}
    >
      <div className="overflow-hidden" >
        <img
          className="w-24 h-24 mx-auto object-cover transition-transform duration-300 group-hover:scale-110"
          src={option?.logo}
          alt="Logo"
        />
      </div>
      <p className="text-center text-lg font-semibold">{option?.name}</p>
    </div>
  );
};

export default BrandCard;