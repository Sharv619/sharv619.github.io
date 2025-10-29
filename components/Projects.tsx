import React, { useRef, useEffect, useCallback } from 'react';
import { PROJECTS_DATA } from '../constants';

const GithubIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const ChevronLeftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const Projects: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);

    const advanceCarousel = useCallback(() => {
        if (!scrollContainerRef.current) return;
        
        const { current: container } = scrollContainerRef;
        const card = container.querySelector('.project-card');
        if (!card) return;

        const scrollAmount = card.clientWidth + 16; // card width + 1rem gap
        // Check if we are near the end (with a small tolerance)
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

        if (isAtEnd) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, []);
    //asdasdasdasdasdadasdasdasda
    const startAutoScroll = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(advanceCarousel, 30000); // 30 seconds
    }, [advanceCarousel]);
    
    useEffect(() => {
        startAutoScroll();
        const container = scrollContainerRef.current;
    
        const pauseAutoScroll = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    
        if (container) {
            container.addEventListener('mouseenter', pauseAutoScroll);
            container.addEventListener('mouseleave', startAutoScroll);
        }
    
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (container) {
                container.removeEventListener('mouseenter', pauseAutoScroll);
                container.removeEventListener('mouseleave', startAutoScroll);
            }
        };
    }, [startAutoScroll]);

    const manualScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current: container } = scrollContainerRef;
            const card = container.querySelector('.project-card');
            if (card) {
                const scrollAmount = card.clientWidth + 16;
                container.scrollBy({ 
                    left: direction === 'left' ? -scrollAmount : scrollAmount, 
                    behavior: 'smooth' 
                });
                // Reset timer on manual interaction
                startAutoScroll();
            }
        }
    };

    return (
        <section id="projects" className="py-24 scroll-mt-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16">
                My Work
            </h2>
            
            <div className="relative max-w-6xl mx-auto">
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 -mx-4 px-4"
                >
                    {PROJECTS_DATA.map((project, index) => (
                        <div 
                            key={index} 
                            className="project-card snap-start flex-shrink-0 w-[90%] sm:w-[48%] lg:w-[32%] bg-white dark:bg-gray-800 rounded-xl shadow-lg group flex flex-col overflow-hidden h-[480px]"
                        >
                            <div className="h-48 overflow-hidden flex-shrink-0">
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h3>
                                <p className="text-gray-700 dark:text-gray-400 text-sm mt-1 flex-grow">{project.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium bg-gray-200 dark:bg-gray-700 text-blue-400 dark:text-blue-300 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-end pt-2">
                                    <a 
                                        href={project.githubUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-gray-700 dark:text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                                        aria-label={`View ${project.title} on GitHub`}
                                    >
                                        <GithubIcon />
                                    </a>
                                 </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => manualScroll('left')}
                    className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full transition-all backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 hidden md:block"
                    aria-label="Previous projects"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>

                <button 
                    onClick={() => manualScroll('right')}
                    className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full transition-all backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 hidden md:block"
                    aria-label="Next projects"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

export default Projects;
