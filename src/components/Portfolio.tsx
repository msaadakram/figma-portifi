import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown, Code2, Box, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PortfolioProps {
  onNavigateToSnakeGame: () => void;
}

export default function Portfolio({ onNavigateToSnakeGame }: PortfolioProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const projects = [
    {
      title: 'Cyberpunk City Animation',
      category: 'Blender Animation',
      description: 'Futuristic cityscape with procedural buildings, volumetric lighting, and dynamic camera movements. Features advanced shader networks and particle systems.',
      image: 'https://images.unsplash.com/photo-1633783714421-332b7f929148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGFic3RyYWN0fGVufDF8fHx8MTc1OTcyOTk5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Blender', 'Cycles', 'Geometry Nodes', 'EEVEE'],
      link: '#',
      icon: Box
    },
    {
      title: 'Character Rigging System',
      category: 'Blender Animation',
      description: 'Advanced auto-rigging system for humanoid characters with IK/FK switching, facial controls, and automated weight painting.',
      image: 'https://images.unsplash.com/photo-1673541915971-60f52afec329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGVuZGVyJTIwM2QlMjBtb2RlbHxlbnwxfHx8fDE3NTk3NTMyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Blender', 'Python API', 'Rigging', 'Animation'],
      link: '#',
      icon: Box
    },
    {
      title: 'High-Performance Game Engine',
      category: 'C++ Development',
      description: 'Custom 3D game engine built with modern C++20, featuring Vulkan renderer, entity component system, and physics simulation.',
      image: 'https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTk2Nzg5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['C++20', 'Vulkan', 'CMake', 'STL'],
      link: '#',
      icon: Code2
    },
    {
      title: 'Distributed Task Scheduler',
      category: 'C++ Development',
      description: 'Multi-threaded task scheduling system with lock-free queues, memory pools, and advanced concurrency patterns.',
      image: 'https://images.unsplash.com/photo-1733412505442-36cfa59a4240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmclMjBkYXJrfGVufDF8fHx8MTc1OTc1MzI2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['C++', 'Concurrency', 'Performance', 'Design Patterns'],
      link: '#',
      icon: Code2
    },
    {
      title: 'Real-Time Collaboration Platform',
      category: 'Full Stack Development',
      description: 'Enterprise-grade collaboration tool with WebSockets, real-time document editing, video conferencing, and microservices architecture.',
      image: 'https://images.unsplash.com/photo-1635571433479-299afc37eff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbmVvbnxlbnwxfHx8fDE3NTk3MzIwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Node.js', 'WebRTC', 'Redis', 'PostgreSQL'],
      link: '#',
      icon: Layers
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      category: 'Full Stack Development',
      description: 'Machine learning-driven analytics platform with predictive modeling, data visualization, and automated insights generation.',
      image: 'https://images.unsplash.com/photo-1533135091724-62cc5402aa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpY3xlbnwxfHx8fDE3NTk3MDExMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Next.js', 'Python', 'TensorFlow', 'D3.js', 'MongoDB'],
      link: '#',
      icon: Layers
    }
  ];

  const skills = [
    { 
      category: '3D & Animation', 
      items: ['Blender 4.x', 'Geometry Nodes', 'Shader Networks', 'Python Scripting', 'Motion Graphics'],
      icon: Box
    },
    { 
      category: 'C++ Expertise', 
      items: ['Modern C++17/20', 'STL & Boost', 'Multithreading', 'Memory Management', 'Design Patterns'],
      icon: Code2
    },
    { 
      category: 'Full Stack', 
      items: ['React/Next.js', 'Node.js/Express', 'TypeScript', 'GraphQL', 'Microservices'],
      icon: Layers
    },
    { 
      category: 'Tools & DevOps', 
      items: ['Git', 'Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP'],
      icon: Layers
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden dark">
      {/* Gradient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            left: `${mousePosition.x - 250}px`,
            top: `${mousePosition.y - 250}px`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-black/40 backdrop-blur-xl z-50 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                YourName
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all relative group ${
                    activeSection === section ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all ${
                    activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-3 py-2 capitalize ${
                    activeSection === section ? 'text-purple-400' : 'text-gray-400'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Badge variant="secondary" className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Available for Projects
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="mb-4 text-5xl sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Creative Developer
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl sm:text-2xl text-gray-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Blender Artist • C++ Engineer • Full Stack Developer
            </motion.h2>
            
            <motion.p 
              className="text-gray-500 max-w-3xl mx-auto mb-8 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Crafting stunning 3D animations, high-performance systems, and scalable web applications.
              I bridge the gap between art and engineering to create exceptional digital experiences.
            </motion.p>
            
            <motion.div 
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="border-purple-500/30 hover:bg-purple-500/10"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex gap-6 justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="mailto:your.email@example.com" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>

          <motion.button 
            onClick={() => scrollToSection('about')}
            className="mt-16 text-gray-400 hover:text-purple-400 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={32} />
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="mb-12 text-center text-4xl sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-4 text-gray-400">
                <p>
                  I'm a multidisciplinary developer with a passion for creating experiences that blend 
                  artistic vision with technical excellence. With over 7 years of experience across 
                  3D animation, systems programming, and web development, I bring a unique perspective 
                  to every project.
                </p>
                <p>
                  My journey started with 3D art in Blender, where I discovered the power of procedural 
                  generation and scripting. This led me to dive deep into C++ for performance-critical 
                  applications and eventually full-stack development to bring interactive experiences to life.
                </p>
                <p>
                  I thrive on complex challenges that require both creative problem-solving and technical 
                  precision. Whether it's optimizing rendering pipelines, architecting scalable systems, 
                  or crafting immersive animations, I'm driven by the pursuit of excellence.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <motion.div 
                  className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.3)' }}
                >
                  <div className="text-2xl mb-1 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">7+</div>
                  <div className="text-xs text-gray-500">Years Exp</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.3)' }}
                >
                  <div className="text-2xl mb-1 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">50+</div>
                  <div className="text-xs text-gray-500">Projects</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.3)' }}
                >
                  <div className="text-2xl mb-1 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">15+</div>
                  <div className="text-xs text-gray-500">Tech Stack</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1590858078095-24c472408dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBzY3JlZW4lMjBtb25pdG9yfGVufDF8fHx8MTc1OTc1NjUzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Developer Workspace - C++ Development, Blender Animation, Full Stack"
                  className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2 
            className="mb-4 text-center text-4xl sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p
            className="text-center text-gray-500 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A showcase of my work across 3D animation, systems programming, and web development
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group bg-white/5 border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full">
                  <div className="aspect-video overflow-hidden bg-black relative">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <project.icon className="text-purple-400" size={24} />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-purple-400 mb-2">{project.category}</div>
                    <h3 className="mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {project.category === 'C++ Development' ? (
                      <button
                        onClick={onNavigateToSnakeGame}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                      >
                        View Project <ExternalLink size={14} />
                      </button>
                    ) : (
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                      >
                        View Project <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2 
            className="mb-4 text-center text-4xl sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </motion.h2>
          <motion.p
            className="text-center text-gray-500 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/5 border-white/10 hover:border-purple-500/30 transition-all duration-300 group h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                      <skillGroup.icon className="text-purple-400" size={20} />
                    </div>
                    <h3 className="text-white">{skillGroup.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.li 
                        key={skillIndex} 
                        className="text-gray-400 flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.h2 
            className="mb-4 text-4xl sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            I'm always excited to collaborate on innovative projects. Whether you need 3D animation,
            high-performance software, or a full-stack application, let's discuss how I can help bring your vision to life.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
            >
              <a href="mailto:your.email@example.com">
                <Mail className="mr-2" size={20} />
                Send Email
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="border-purple-500/30 hover:bg-purple-500/10"
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2" size={20} />
                Connect on LinkedIn
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <Github size={28} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a 
              href="mailto:your.email@example.com" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <Mail size={28} />
            </motion.a>
          </motion.div>

          {/* Decorative elements */}
          <div className="mt-20 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2025 Your Name. Crafted with passion and precision.</p>
          <p className="text-gray-600 text-sm mt-2">Blender • C++ • Full Stack</p>
        </div>
      </footer>
    </div>
  );
}
