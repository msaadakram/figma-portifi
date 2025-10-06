import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Copy, Check, Github, Download, FileCode, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SnakeGameCppProps {
  onBack: () => void;
}

export default function SnakeGameCpp({ onBack }: SnakeGameCppProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const copyToClipboard = (code: string, fileName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const downloadFiles = () => {
    setIsDownloading(true);
    
    // Create a text file with all source code
    const readmeContent = `# Snake Game - C++ Implementation

## Description
A classic Snake game implemented in modern C++ with object-oriented design patterns.

## Files Included
- main.cpp - Main game implementation
- snake_game.h - Header file with class definition
- CMakeLists.txt - Build configuration

## Build Instructions

### Prerequisites
- C++ compiler with C++17 support (GCC, Clang, or MSVC)
- CMake 3.15 or higher
- Windows: MinGW or Visual Studio
- Linux: ncurses library

### Compilation

Using CMake:
\`\`\`bash
mkdir build && cd build
cmake ..
cmake --build .
\`\`\`

Or compile directly (Windows):
\`\`\`bash
g++ -std=c++17 main.cpp -o snake_game
\`\`\`

### Run
\`\`\`bash
./snake_game
\`\`\`

## Controls
- W/A/S/D - Move snake
- X - Quit game

## Features
- Object-Oriented Design
- Collision Detection
- Dynamic Snake Growth
- Score Tracking

Enjoy the game!
`;

    const fileContents = [
      { name: 'README.md', content: readmeContent },
      { name: 'main.cpp', content: mainCode },
      { name: 'snake_game.h', content: headerCode },
      { name: 'CMakeLists.txt', content: cmakeCode }
    ];

    // Create and download each file
    fileContents.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    setTimeout(() => setIsDownloading(false), 1000);
  };

  const mainCode = `#include <iostream>
#include <conio.h>
#include <windows.h>
#include <vector>
#include <ctime>

using namespace std;

// Game constants
const int WIDTH = 40;
const int HEIGHT = 20;

enum Direction { STOP = 0, LEFT, RIGHT, UP, DOWN };

class SnakeGame {
private:
    bool gameOver;
    int x, y;  // Snake head position
    int fruitX, fruitY;
    int score;
    Direction dir;
    vector<pair<int, int>> tail;
    
public:
    SnakeGame() {
        gameOver = false;
        dir = STOP;
        x = WIDTH / 2;
        y = HEIGHT / 2;
        fruitX = rand() % WIDTH;
        fruitY = rand() % HEIGHT;
        score = 0;
    }
    
    void Draw() {
        system("cls");  // Clear console
        
        // Top border
        for (int i = 0; i < WIDTH + 2; i++)
            cout << "#";
        cout << endl;
        
        // Game field
        for (int i = 0; i < HEIGHT; i++) {
            for (int j = 0; j < WIDTH; j++) {
                if (j == 0)
                    cout << "#";  // Left border
                    
                if (i == y && j == x)
                    cout << "O";  // Snake head
                else if (i == fruitY && j == fruitX)
                    cout << "F";  // Fruit
                else {
                    bool printTail = false;
                    for (auto& segment : tail) {
                        if (segment.first == j && segment.second == i) {
                            cout << "o";  // Snake tail
                            printTail = true;
                            break;
                        }
                    }
                    if (!printTail)
                        cout << " ";
                }
                
                if (j == WIDTH - 1)
                    cout << "#";  // Right border
            }
            cout << endl;
        }
        
        // Bottom border
        for (int i = 0; i < WIDTH + 2; i++)
            cout << "#";
        cout << endl;
        
        cout << "Score: " << score << endl;
        cout << "Controls: W/A/S/D to move, X to quit" << endl;
    }
    
    void Input() {
        if (_kbhit()) {
            char key = _getch();
            switch (key) {
                case 'a':
                case 'A':
                    if (dir != RIGHT)
                        dir = LEFT;
                    break;
                case 'd':
                case 'D':
                    if (dir != LEFT)
                        dir = RIGHT;
                    break;
                case 'w':
                case 'W':
                    if (dir != DOWN)
                        dir = UP;
                    break;
                case 's':
                case 'S':
                    if (dir != UP)
                        dir = DOWN;
                    break;
                case 'x':
                case 'X':
                    gameOver = true;
                    break;
            }
        }
    }
    
    void Logic() {
        // Update tail position
        if (!tail.empty()) {
            tail.insert(tail.begin(), make_pair(x, y));
            tail.pop_back();
        }
        
        // Move snake head
        switch (dir) {
            case LEFT:
                x--;
                break;
            case RIGHT:
                x++;
                break;
            case UP:
                y--;
                break;
            case DOWN:
                y++;
                break;
            default:
                break;
        }
        
        // Check wall collision
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT)
            gameOver = true;
            
        // Check self collision
        for (auto& segment : tail) {
            if (segment.first == x && segment.second == y)
                gameOver = true;
        }
        
        // Check fruit collision
        if (x == fruitX && y == fruitY) {
            score += 10;
            fruitX = rand() % WIDTH;
            fruitY = rand() % HEIGHT;
            tail.push_back(make_pair(x, y));
        }
    }
    
    bool IsGameOver() {
        return gameOver;
    }
    
    int GetScore() {
        return score;
    }
};

int main() {
    srand(time(0));
    
    SnakeGame game;
    
    cout << "==================================" << endl;
    cout << "    SNAKE GAME - C++ Edition     " << endl;
    cout << "==================================" << endl;
    cout << "Press any key to start..." << endl;
    _getch();
    
    while (!game.IsGameOver()) {
        game.Draw();
        game.Input();
        game.Logic();
        Sleep(100);  // Game speed control
    }
    
    system("cls");
    cout << "==================================" << endl;
    cout << "         GAME OVER!              " << endl;
    cout << "==================================" << endl;
    cout << "Final Score: " << game.GetScore() << endl;
    cout << "Thanks for playing!" << endl;
    cout << "Press any key to exit..." << endl;
    _getch();
    
    return 0;
}`;

  const headerCode = `// snake_game.h
#ifndef SNAKE_GAME_H
#define SNAKE_GAME_H

#include <vector>
#include <utility>

enum Direction { STOP = 0, LEFT, RIGHT, UP, DOWN };

class SnakeGame {
private:
    bool gameOver;
    int x, y;
    int fruitX, fruitY;
    int score;
    Direction dir;
    std::vector<std::pair<int, int>> tail;
    
    static const int WIDTH = 40;
    static const int HEIGHT = 20;
    
public:
    SnakeGame();
    ~SnakeGame() = default;
    
    void Draw();
    void Input();
    void Logic();
    bool IsGameOver() const;
    int GetScore() const;
    
    // Getters
    int GetWidth() const { return WIDTH; }
    int GetHeight() const { return HEIGHT; }
};

#endif // SNAKE_GAME_H`;

  const cmakeCode = `# CMakeLists.txt
cmake_minimum_required(VERSION 3.15)
project(SnakeGame VERSION 1.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable
add_executable(snake_game 
    src/main.cpp
    src/snake_game.cpp
)

# Include directories
target_include_directories(snake_game PRIVATE 
    \${CMAKE_SOURCE_DIR}/include
)

# Platform-specific settings
if(WIN32)
    # Windows-specific flags
    target_compile_definitions(snake_game PRIVATE _WIN32)
elseif(UNIX)
    # Unix-specific libraries
    find_package(Curses REQUIRED)
    target_link_libraries(snake_game PRIVATE \${CURSES_LIBRARIES})
    target_include_directories(snake_game PRIVATE \${CURSES_INCLUDE_DIR})
endif()

# Compiler warnings
if(MSVC)
    target_compile_options(snake_game PRIVATE /W4)
else()
    target_compile_options(snake_game PRIVATE -Wall -Wextra -Wpedantic)
endif()

# Install target
install(TARGETS snake_game DESTINATION bin)`;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden dark">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5" />
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]"
          animate={{
            x: [-30, 30, -30],
            y: [20, -20, 20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Portfolio
              </Button>
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-blue-500/30 hover:bg-blue-500/10"
                    onClick={downloadFiles}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <Package className="mr-2 animate-bounce" size={16} />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2" size={16} />
                        Download Files
                      </>
                    )}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-purple-500/30 hover:bg-purple-500/10"
                    asChild
                  >
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2" size={16} />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge className="mb-4 bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <FileCode className="mr-1" size={14} />
                C++ Project
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              Snake Game - Classic Console Implementation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg mb-6"
            >
              A classic Snake game implemented in modern C++ with object-oriented design patterns,
              efficient memory management, and cross-platform support.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {['C++17', 'OOP', 'CMake', 'Windows API', 'STL'].map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { value: '200+', label: 'Lines of Code' },
                { value: 'C++17', label: 'Standard' },
                { value: 'OOP', label: 'Design Pattern' },
                { value: 'Cross', label: 'Platform' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <Card className="p-4 bg-white/5 border-white/10 hover:border-purple-500/30 transition-all">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                      className="text-2xl mb-1 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="text-2xl mb-6 text-white"
            >
              Key Features
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Object-Oriented Design', desc: 'Clean class structure with encapsulation and separation of concerns' },
                { title: 'Collision Detection', desc: 'Efficient wall and self-collision detection algorithms' },
                { title: 'Dynamic Growth', desc: 'Snake grows dynamically using STL vector containers' },
                { title: 'Game Loop', desc: 'Classic game loop with input, logic, and render phases' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Card className="p-4 bg-white/5 border-white/10 hover:border-purple-500/30 transition-all h-full">
                    <h3 className="text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="text-2xl mb-6 text-white"
            >
              Source Code
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.9 }}
            >
              <Tabs defaultValue="main" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 mb-4">
                <TabsTrigger value="main" className="data-[state=active]:bg-purple-500/20">
                  main.cpp
                </TabsTrigger>
                <TabsTrigger value="header" className="data-[state=active]:bg-purple-500/20">
                  snake_game.h
                </TabsTrigger>
                <TabsTrigger value="cmake" className="data-[state=active]:bg-purple-500/20">
                  CMakeLists.txt
                </TabsTrigger>
              </TabsList>

              <TabsContent value="main">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-black/60 border-white/10 overflow-hidden hover:border-purple-500/20 transition-all">
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-red-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-yellow-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-green-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <span className="ml-4 text-gray-400 text-sm">main.cpp</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(mainCode, 'main')}
                          className="text-gray-400 hover:text-white"
                        >
                          <AnimatePresence mode="wait">
                            {copiedFile === 'main' ? (
                              <motion.div
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Check className="mr-2" size={16} />
                                Copied!
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Copy className="mr-2" size={16} />
                                Copy
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-300 font-mono">{mainCode}</code>
                    </pre>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="header">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-black/60 border-white/10 overflow-hidden hover:border-purple-500/20 transition-all">
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-red-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-yellow-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-green-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <span className="ml-4 text-gray-400 text-sm">snake_game.h</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(headerCode, 'header')}
                          className="text-gray-400 hover:text-white"
                        >
                          <AnimatePresence mode="wait">
                            {copiedFile === 'header' ? (
                              <motion.div
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Check className="mr-2" size={16} />
                                Copied!
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Copy className="mr-2" size={16} />
                                Copy
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-300 font-mono">{headerCode}</code>
                    </pre>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="cmake">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-black/60 border-white/10 overflow-hidden hover:border-purple-500/20 transition-all">
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-red-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-yellow-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-green-500"
                          whileHover={{ scale: 1.2 }}
                        ></motion.div>
                        <span className="ml-4 text-gray-400 text-sm">CMakeLists.txt</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(cmakeCode, 'cmake')}
                          className="text-gray-400 hover:text-white"
                        >
                          <AnimatePresence mode="wait">
                            {copiedFile === 'cmake' ? (
                              <motion.div
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Check className="mr-2" size={16} />
                                Copied!
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center"
                              >
                                <Copy className="mr-2" size={16} />
                                Copy
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-300 font-mono">{cmakeCode}</code>
                    </pre>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
            </motion.div>
          </motion.div>

          {/* Build Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="mt-12"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1 }}
              className="text-2xl mb-6 text-white"
            >
              Build & Run
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="p-6 bg-white/5 border-white/10 hover:border-purple-500/20 transition-all">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white mb-2">Prerequisites</h3>
                  <ul className="text-gray-400 space-y-1 text-sm">
                    <li>• C++ compiler with C++17 support (GCC, Clang, or MSVC)</li>
                    <li>• CMake 3.15 or higher</li>
                    <li>• Windows: MinGW or Visual Studio</li>
                    <li>• Linux: ncurses library</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white mb-2">Compilation</h3>
                  <pre className="bg-black/60 p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
{`# Using CMake
mkdir build && cd build
cmake ..
cmake --build .

# Or compile directly (Windows)
g++ -std=c++17 main.cpp -o snake_game

# Run
./snake_game`}
                  </pre>
                </div>
              </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}