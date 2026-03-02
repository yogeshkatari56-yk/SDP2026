export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="h-44 bg-indigo-50 flex items-center justify-center">
        <img src={course.thumbnail || 'https://via.placeholder.com/300'} alt="Course" className="object-cover w-full h-full" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">{course.title}</h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{course.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-indigo-600 font-bold text-xl">${course.price}</span>
          <button className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">View Details</button>
        </div>
      </div>
    </div>
  );
}