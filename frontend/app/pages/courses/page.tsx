"use client"
import React, { useState } from 'react';
import { Play, CheckCircle, Clock, Users, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollFadeIn } from '@/app/components/scrollanimation';

export default function CoachCoursePage() {
  const [expandedModule, setExpandedModule] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  const modules = [
    {
      id: 1,
      title: 'Foundation & Mindset',
      duration: '2 weeks',
      lessons: 8,
      topics: ['Understanding Your Why', 'Goal Setting Framework', 'Overcoming Mental Blocks', 'Daily Success Rituals']
    },
    {
      id: 2,
      title: 'Core Strategies',
      duration: '3 weeks',
      lessons: 12,
      topics: ['Time Management Mastery', 'Productivity Systems', 'Building Consistency', 'Tracking Progress']
    },
    {
      id: 3,
      title: 'Advanced Techniques',
      duration: '3 weeks',
      lessons: 10,
      topics: ['Peak Performance States', 'Advanced Planning', 'Habit Stacking', 'Energy Management']
    },
    {
      id: 4,
      title: 'Mastery & Beyond',
      duration: '2 weeks',
      lessons: 6,
      topics: ['Sustained Excellence', 'Coaching Others', 'Long-term Vision', 'Legacy Building']
    }
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', role: 'Entrepreneur', text: 'This course completely transformed how I approach my goals. The frameworks are practical and life-changing.' },
    { name: 'James Rodriguez', role: 'Corporate Executive', text: 'The best investment in myself. The strategies helped me double my productivity while reducing stress.' },
    { name: 'Emily Chen', role: 'Creative Professional', text: 'Finally found a system that works for my creative brain. Highly recommend to anyone feeling stuck.' }
  ];

  return (
    <div className="min-h-screen bg-[#180A0A] text-white">
      {/* Hero Section */}
      <ScrollFadeIn delay={400}>
      <div className="relative overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#711A75] via-[#180A0A] to-[#180A0A] opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#F10086] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                BESTSELLER COURSE
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F582A7] to-[#F10086] bg-clip-text text-transparent overflow-hidden">
                Online Digital Marketing
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Master proven strategies to unlock your full potential and achieve extraordinary results in every area of your life.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#F10086] text-[#F10086]" />
                  <span className="font-semibold">2.9/5</span>
                  <span className="text-gray-400">(100 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#F582A7]" />
                  <span className="text-gray-300">50 students</span>
                </div>
              </div>
              <button className="bg-[#F10086] hover:bg-[#711A75] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform hover:cursor-pointer" />
                Start Your Transformation
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#711A75] to-[#F10086] p-1 rounded-2xl">
                <div className="bg-[#180A0A] p-8 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Course Duration</span>
                      <span className="font-semibold">{"None"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Lessons</span>
                      <span className="font-semibold">{"None"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Skill Level</span>
                      <span className="font-semibold">{"None"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Certificate</span>
                      <span className="font-semibold">{"None"}</span>
                    </div>
                    <div className="pt-4 border-t border-[#711A75]">
                      <div className="text-3xl font-bold text-[#F10086] mb-2 overflow-hidden">{"None"}</div>
                      <div className="text-gray-400 line-through">{"None"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </ScrollFadeIn>

      {/* Tabs Navigation */}
      <div className="border-b border-[#711A75]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            {['overview', 'curriculum', 'testimonials'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-2 font-semibold capitalize transition-colors relative ${
                  selectedTab === tab ? 'text-[#F10086]' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}
                {selectedTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F10086]"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {selectedTab === 'overview' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#F582A7] overflow-hidden">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* {[
                  'Design a personalized success roadmap',
                  'Master time management and productivity',
                  'Build unshakeable confidence and mindset',
                  'Create sustainable high-performance habits',
                  'Overcome procrastination and self-doubt',
                  'Achieve work-life balance and fulfillment'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#F10086] flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))} */}
                <h1 className='text-2xl'>Comming Soon!</h1>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#F582A7] overflow-hidden">Course Includes</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: '10+ Video Lessons', desc: 'HD quality content' },
                  { label: 'Workbooks & Tools', desc: 'Downloadable resources' },
                  { label: 'Lifetime Access', desc: 'Learn at your pace' },
                  { label: 'Private Community', desc: 'Connect with peers' },
                  { label: 'Weekly Live Q&A', desc: 'Direct coaching support' },
                  { label: 'Certificate', desc: 'Upon completion' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#711A75] bg-opacity-20 p-6 rounded-lg border border-[#711A75]">
                    <div className="font-semibold text-lg mb-2">{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'curriculum' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#F582A7] overflow-hidden">Course Curriculum</h2>
            <div className="space-y-4">
              {/* {modules.map((module) => (
                <div key={module.id} className="border border-[#711A75] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-[#711A75] hover:bg-opacity-20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F10086] rounded-lg flex items-center justify-center font-bold">
                        {module.id}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </span>
                          <span>{module.lessons} lessons</span>
                        </div>
                      </div>
                    </div>
                    {expandedModule === module.id ? (
                      <ChevronUp className="w-6 h-6 text-[#F582A7]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  {expandedModule === module.id && (
                    <div className="px-6 pb-6 bg-[#711A75] bg-opacity-10">
                      <div className="pl-16 space-y-2">
                        {module.topics.map((topic, idx) => (
                          <div key={idx} className="py-2 text-gray-300">
                            • {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))} */}
              <h1 className='text-2xl'>Courses will soon appear here.</h1>
            </div>
          </div>
        )}

        {selectedTab === 'testimonials' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#F582A7] overflow-hidden">Student Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <p>Testimonials will soon appear here.</p>
              {/* {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-[#711A75] bg-opacity-20 p-6 rounded-lg border border-[#711A75]">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#F10086] text-[#F10086]" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#711A75] to-[#F10086] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 overflow-hidden">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 text-gray-100">Join thousands of students who have already started their journey to success.</p>
          <button className="bg-white text-[#711A75] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Enroll Now
          </button>
          <p className="mt-4 text-sm text-gray-200">30-day money-back guarantee • Start immediately</p>
        </div>
      </div>
    </div>
  );
}