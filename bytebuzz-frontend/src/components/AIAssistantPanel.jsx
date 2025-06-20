// import React, { useState } from "react";
// import { FiZap, FiMessageSquare, FiGlobe, FiFileText } from "react-icons/fi";
// import { motion } from "framer-motion";

// const AIAssistantPanel = () => {
//   const [aiQuery, setAiQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [aiResponse, setAiResponse] = useState(null);
//   const [activeTab, setActiveTab] = useState("summary");

//   const handleAIRequest = async (type) => {
//     if (!aiQuery.trim()) return;
    
//     setIsLoading(true);
//     setAiResponse(null);
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock responses based on type
//       const mockResponses = {
//         summary: `Summary of conversation: The team discussed project timelines, with emphasis on completing the UI by Friday. Key decisions were made about color schemes and user flows.`,
//         translate: `Translation to Hindi: टीम ने शुक्रवार तक यूआई पूरा करने पर जोर देते हुए परियोजना समयसीमा पर चर्चा की। रंग योजनाओं और उपयोगकर्ता प्रवाह के बारे में महत्वपूर्ण निर्णय लिए गए।`,
//         action: `Action items identified:\n1. Finalize color palette by Wednesday\n2. Create user flow diagrams\n3. Schedule client review for Friday`,
//         search: `Found 3 relevant messages:\n- "Let's use blue as primary color"\n- "User onboarding flow needs revision"\n- "Client meeting scheduled for Friday 3PM"`
//       };
      
//       setAiResponse({
//         type,
//         content: mockResponses[type]
//       });
//     } catch (error) {
//       console.error("AI request failed:", error);
//       setAiResponse({
//         type: "error",
//         content: "Failed to get AI response. Please try again."
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const aiFeatures = [
//     { id: "summary", icon: <FiFileText />, label: "Summarize" },
//     { id: "translate", icon: <FiGlobe />, label: "Translate" },
//     { id: "action", icon: <FiZap />, label: "Action Items" },
//     { id: "search", icon: <FiMessageSquare />, label: "Search Chat" }
//   ];

//   return (
//     <motion.div 
//       initial={{ x: 50, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       className="hidden lg:block w-72 p-4 bg-white dark:bg-gray-800 border-l dark:border-gray-700 h-screen fixed right-0 top-20 overflow-y-auto"
//     >
//       <div className="mb-6">
//         <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
//           <FiZap className="text-yellow-500" /> AI Assistant
//         </h3>
        
//         <div className="flex border-b dark:border-gray-700 mb-4">
//           {aiFeatures.map((feature) => (
//             <button
//               key={feature.id}
//               onClick={() => setActiveTab(feature.id)}
//               className={`flex-1 py-2 text-xs font-medium transition-colors ${
//                 activeTab === feature.id
//                   ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
//                   : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//               }`}
//             >
//               {feature.icon} {feature.label}
//             </button>
//           ))}
//         </div>
        
//         <div className="mb-4">
//           <textarea
//             value={aiQuery}
//             onChange={(e) => setAiQuery(e.target.value)}
//             placeholder={`Ask AI to ${activeTab}...`}
//             className="w-full p-3 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="3"
//           />
//         </div>
        
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => handleAIRequest(activeTab)}
//           disabled={isLoading || !aiQuery.trim()}
//           className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
//             isLoading
//               ? "bg-gray-200 dark:bg-gray-700 text-gray-500"
//               : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
//           }`}
//         >
//           {isLoading ? (
//             "Processing..."
//           ) : (
//             <>
//               <FiZap /> Generate {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//             </>
//           )}
//         </motion.button>
//       </div>
      
//       {aiResponse && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg"
//         >
//           <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
//             {aiResponse.type === "summary" && <FiFileText />}
//             {aiResponse.type === "translate" && <FiGlobe />}
//             {aiResponse.type === "action" && <FiZap />}
//             {aiResponse.type === "search" && <FiMessageSquare />}
//             <span className="font-medium">
//               {aiResponse.type.charAt(0).toUpperCase() + aiResponse.type.slice(1)}
//             </span>
//           </div>
//           <p className="text-sm whitespace-pre-line dark:text-gray-200">
//             {aiResponse.content}
//           </p>
//         </motion.div>
//       )}
      
//       <div className="mt-6">
//         <h4 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
//           Quick Suggestions
//         </h4>
//         <div className="space-y-2">
//           {[
//             "Summarize today's conversation",
//             "Translate last message to Hindi",
//             "List action items",
//             "Find messages about deadlines"
//           ].map((suggestion) => (
//             <motion.button
//               key={suggestion}
//               whileHover={{ x: 5 }}
//               onClick={() => setAiQuery(suggestion)}
//               className="w-full text-left p-2 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//             >
//               {suggestion}
//             </motion.button>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AIAssistantPanel;