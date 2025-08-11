// import dayjs from "dayjs"
// import type {
//   PlanningDay,
//   PlanningGroup,
//   PlanningItem,
// } from "@xefi/x-react/templates"
// import { PlanningTemplate, PlanningUser } from "@xefi/x-react/templates"

// // Exemple 1: Planning de congés avec Dayjs
// interface LeaveData {
//   type: "vacation" | "sick" | "personal"
//   status: "pending" | "approved" | "rejected"
//   notes?: string
// }

// interface UserData {
//   email: string
//   department: string
//   remainingDays: number
// }

// interface GroupData {
//   managerId: string
//   location: string
// }

// const ExampleLeaveePlanning = () => {
//   // Données d'exemple
//   const groups: PlanningGroup<GroupData, UserData>[] = [
//     {
//       id: "dev-team",
//       name: "Équipe Développement",
//       data: { managerId: "manager-1", location: "Paris" },
//       users: [
//         {
//           id: "user-1",
//           name: "Alice Martin",
//           data: {
//             email: "alice@company.com",
//             department: "Frontend",
//             remainingDays: 25,
//           },
//         },
//         {
//           id: "user-2",
//           name: "Bob Dupont",
//           data: {
//             email: "bob@company.com",
//             department: "Backend",
//             remainingDays: 18,
//           },
//         },
//       ],
//     },
//     {
//       id: "design-team",
//       name: "Équipe Design",
//       data: { managerId: "manager-2", location: "Lyon" },
//       users: [
//         {
//           id: "user-3",
//           name: "Claire Moreau",
//           data: {
//             email: "claire@company.com",
//             department: "UX/UI",
//             remainingDays: 22,
//           },
//         },
//       ],
//     },
//   ]

//   const items: PlanningItem<LeaveData>[] = [
//     {
//       id: "leave-1",
//       user_id: "user-1",
//       start_date: "2024-12-20",
//       end_date: "2024-12-27",
//       color: "#3b82f6",
//       title: "Congés de Noël",
//       data: { type: "vacation", status: "approved", notes: "Vacances famille" },
//     },
//     {
//       id: "leave-2",
//       user_id: "user-2",
//       start_date: "2024-12-15",
//       end_date: "2024-12-16",
//       color: "#ef4444",
//       title: "Congé maladie",
//       data: { type: "sick", status: "approved" },
//     },
//     {
//       id: "leave-3",
//       user_id: "user-3",
//       start_date: "2024-12-23",
//       end_date: "2024-12-30",
//       color: "#10b981",
//       title: "Congés personnels",
//       data: { type: "personal", status: "pending" },
//     },
//   ]

//   const periodDays: PlanningDay<dayjs.Dayjs>[] = Array.from(
//     { length: 31 },
//     (_, i) => {
//       const date = dayjs("2024-12-01").add(i, "day")
//       return {
//         date,
//         isWeekend: date.day() === 0 || date.day() === 6,
//         isHoliday: date.date() === 25, // Noël
//         holidayName: date.date() === 25 ? "Noël" : undefined,
//       }
//     }
//   )

//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">
//         Planning des Congés - Décembre 2024
//       </h1>

//       <PlanningTemplate<GroupData, UserData, LeaveData, dayjs.Dayjs>
//         groups={groups}
//         items={items}
//         periodDays={periodDays}
//         headerTitle="Décembre 2024"
//         showNavigation={true}
//         onNavigatePrevious={() => console.log("Mois précédent")}
//         onNavigateNext={() => console.log("Mois suivant")}
//         sidebarTabs={[
//           { key: "departments", label: "Départements" },
//           { key: "teams", label: "Équipes" },
//         ]}
//         defaultSelectedTab="departments"
//         onTabChange={(tab) => console.log("Tab changed:", tab)}
//         expandedGroups={{ "dev-team": true, "design-team": false }}
//         onGroupToggle={(groupId) => console.log("Toggle group:", groupId)}
//         // Rendu personnalisé de l'utilisateur dans la sidebar
//         renderSidebarUser={(user, showDetails) => (
//           <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50">
//             <span className="font-medium">{user.name}</span>
//             {showDetails && (
//               <span className="text-xs text-gray-500">
//                 {user.data.remainingDays} jours
//               </span>
//             )}
//           </div>
//         )}
//         // Rendu personnalisé des cellules
//         renderBodyCell={(user, day, items) => (
//           <div className="relative flex min-h-[40px] min-w-[20px] items-center justify-center border-r border-border/20">
//             {items.map((item, idx) => {
//               const isApproved = item.data.status === "approved"
//               const isPending = item.data.status === "pending"

//               return (
//                 <div
//                   key={`${item.id}-${idx}`}
//                   className={`size-full ${
//                     isPending ? "animate-pulse opacity-60" : ""
//                   }`}
//                   style={{ backgroundColor: item.color }}
//                   title={`${item.title} - ${item.data.status}`}
//                 >
//                   {isPending && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span className="text-xs text-white">?</span>
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         )}
//         cellMinWidth="25px"
//         className="rounded-lg border shadow-sm"
//       />
//     </div>
//   )
// }

// // Exemple 2: Planning de projet avec Date native
// interface TaskData {
//   priority: "low" | "medium" | "high"
//   progress: number
//   assignedBy: string
// }

// interface DeveloperData {
//   skills: string[]
//   hourlyRate: number
//   availability: number
// }

// interface ProjectData {
//   budget: number
//   client: string
//   deadline: string
// }

// const ExampleProjectPlanning = () => {
//   // Utilise Date native au lieu de Dayjs
//   const periodDaysWithNativeDate: PlanningDay<Date>[] = Array.from(
//     { length: 14 },
//     (_, i) => {
//       const date = new Date(2024, 11, 1 + i) // Décembre 2024
//       return {
//         date,
//         isWeekend: date.getDay() === 0 || date.getDay() === 6,
//         isHoliday: false,
//       }
//     }
//   )

//   const projectGroups: PlanningGroup<ProjectData, DeveloperData>[] = [
//     {
//       id: "project-a",
//       name: "Site E-commerce",
//       data: { budget: 50000, client: "Client A", deadline: "2024-12-31" },
//       users: [
//         {
//           id: "dev-1",
//           name: "Sarah Dev",
//           data: {
//             skills: ["React", "Node.js"],
//             hourlyRate: 45,
//             availability: 100,
//           },
//         },
//         {
//           id: "dev-2",
//           name: "Mike Frontend",
//           data: { skills: ["Vue.js", "CSS"], hourlyRate: 40, availability: 80 },
//         },
//       ],
//     },
//   ]

//   const projectTasks: PlanningItem<TaskData>[] = [
//     {
//       id: "task-1",
//       user_id: "dev-1",
//       start_date: "2024-12-01",
//       end_date: "2024-12-05",
//       color: "#f59e0b",
//       title: "API Development",
//       data: { priority: "high", progress: 75, assignedBy: "PM-1" },
//     },
//   ]

//   // Adaptation pour Date native
//   const adaptDateForGeneric = (date: Date) => ({
//     format: (fmt: string) => {
//       // Implémentation basique pour l'exemple
//       if (fmt === "DD") {
//         return date.getDate().toString().padStart(2, "0")
//       }
//       if (fmt === "ddd") {
//         return ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][date.getDay()]
//       }
//       if (fmt === "YYYY-MM-DD") {
//         return date.toISOString().split("T")[0]
//       }
//       return date.toLocaleDateString()
//     },
//     toDate: () => date,
//   })

//   const adaptedPeriodDays = periodDaysWithNativeDate.map((day) => ({
//     ...day,
//     date: adaptDateForGeneric(day.date),
//   }))

//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">
//         Planning Projet - Décembre 2024
//       </h1>

//       <PlanningTemplate
//         groups={projectGroups}
//         items={projectTasks}
//         periodDays={adaptedPeriodDays}
//         headerTitle="Sprint Décembre"
//         showNavigation={false}
//         sidebarWidth={280}
//         renderSidebarUser={(user) => (
//           <div className="border-b border-gray-100 px-4 py-3">
//             <div className="font-medium">{user.name}</div>
//             <div className="text-xs text-gray-500">
//               {user.data.skills.join(", ")} • {user.data.hourlyRate}€/h
//             </div>
//             <div className="mt-1 h-2 rounded-full bg-gray-200">
//               <div
//                 className="h-2 rounded-full bg-green-500"
//                 style={{ width: `${user.data.availability}%` }}
//               />
//             </div>
//           </div>
//         )}
//         renderBodyCell={(user, day, items) => (
//           <div className="min-h-[50px] min-w-[30px] border-r border-border/20 p-1">
//             {items.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="mb-1 rounded px-1 py-0.5 text-xs text-white"
//                 style={{ backgroundColor: item.color }}
//               >
//                 {item.data.progress}%
//               </div>
//             ))}
//           </div>
//         )}
//         cellMinWidth="30px"
//       />
//     </div>
//   )
// }

// export { ExampleLeaveePlanning, ExampleProjectPlanning }
