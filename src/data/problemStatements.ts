export interface StaticProblemStatement {
  number: number;
  title: string;
  description: string;
  features: string[];
}

export const problemStatements: StaticProblemStatement[] = [
  {
    number: 1,
    title: "Adaptive Traffic Signal Optimization Controller",
    description:
      "Design a digital traffic intersection controller capable of dynamically adjusting signal timing based on traffic density inputs from four directions. The controller should extend or reduce green light duration depending on vehicle presence while ensuring safe transitions between signal states. An emergency override input should grant immediate priority to emergency vehicles.",
    features: [
      "Traffic density based signal timing",
      "Safe signal transition logic",
      "Emergency priority handling",
      "Congestion indication output",
      "Four-direction signal control",
    ],
  },
  {
    number: 2,
    title: "Smart Electric Vehicle Charging Station Controller",
    description:
      "Develop a controller that manages multiple electric vehicle charging ports in a public charging station. The system should allocate available charging slots to arriving vehicles and place additional vehicles into a waiting queue when all slots are occupied. Charging duration must be monitored and automatically terminated upon completion.",
    features: [
      "Multi-slot charging allocation",
      "Vehicle waiting queue logic",
      "Charging timer control",
      "Charging completion indication",
      "Capacity monitoring",
    ],
  },
  {
    number: 3,
    title: "Intelligent Urban Parking Allocation System",
    description:
      "Design a controller for an automated parking facility that continuously tracks vehicle entry and exit while maintaining real-time availability of parking slots. The system must prevent new vehicle entry when the facility reaches full capacity and provide status signals indicating availability.",
    features: [
      "Parking slot availability tracking",
      "Vehicle entry and exit counters",
      "Parking full detection",
      "Entry permission control",
      "Occupancy status output",
    ],
  },
  {
    number: 4,
    title: "Smart Public Transport Occupancy Monitor",
    description:
      "Create a monitoring controller that counts passengers entering and exiting a public transport vehicle or station. The system should maintain real-time occupancy levels and generate alerts if the passenger count exceeds safe capacity limits.",
    features: [
      "Passenger entry and exit counting",
      "Occupancy monitoring",
      "Overcrowding alert generation",
      "Real-time occupancy output",
      "System reset functionality",
    ],
  },
  {
    number: 5,
    title: "Intelligent Waste Sorting Conveyor Controller",
    description:
      "Develop a controller for an automated waste segregation system used in recycling facilities. Based on classification inputs from sensors, the system should direct waste items to appropriate bins through routing actuators. The controller must also detect conveyor jams and trigger alerts.",
    features: [
      "Waste classification processing",
      "Conveyor routing control",
      "Sorting bin selection",
      "Jam detection mechanism",
      "Fault alert signal",
    ],
  },
  {
    number: 6,
    title: "Smart Water Tank Distribution Controller",
    description:
      "Design a controller for a municipal water storage tank that maintains the water level between predefined upper and lower limits. The pump should activate when the water level drops below the lower threshold and stop once the upper threshold is reached.",
    features: [
      "Upper and lower level monitoring",
      "Automatic pump control",
      "Overflow protection",
      "Low-water alert",
      "Manual reset capability",
    ],
  },
  {
    number: 7,
    title: "Multi-Elevator Coordination Controller",
    description:
      "Develop a digital system that manages three elevators in a building. The controller should efficiently assign floor requests to the most suitable elevator while avoiding redundant movements and minimizing passenger waiting time.",
    features: [
      "Multi-elevator request handling",
      "Floor request arbitration",
      "Direction priority management",
      "Idle elevator assignment",
      "Elevator movement control",
    ],
  },
  {
    number: 8,
    title: "Railway Level Crossing Automation Controller",
    description:
      "Design a controller that automates the operation of a railway level crossing gate. Upon detecting an approaching train signal, the system must activate warning lights and close the gate to road traffic. After the train passes, the controller should safely reopen the gate.",
    features: [
      "Train detection input processing",
      "Automatic gate operation",
      "Warning signal activation",
      "Safe reopening sequence",
      "Fault indication output",
    ],
  },
  {
    number: 9,
    title: "Smart Streetlight Network Controller",
    description:
      "Develop a controller for energy-efficient street lighting systems. The lights should automatically adjust brightness based on ambient light levels and motion detection signals to optimize power usage.",
    features: [
      "Ambient light sensing input",
      "Motion-based brightness control",
      "Energy-saving dimming mode",
      "Lamp failure detection",
      "Status indicator outputs",
    ],
  },
  {
    number: 10,
    title: "Industrial Conveyor Package Routing System",
    description:
      "Create a controller that directs packages on a warehouse conveyor belt to appropriate sorting lanes based on package identification signals. The system should also maintain package counts for each lane.",
    features: [
      "Package classification logic",
      "Conveyor routing control",
      "Sorting lane counters",
      "Conveyor fault alert",
      "Sorting completion signal",
    ],
  },
  {
    number: 11,
    title: "Smart Energy Consumption Monitor",
    description:
      "Design a digital monitoring system that tracks electrical energy usage in a building. The controller should accumulate energy consumption over time and trigger alerts when usage exceeds predefined limits.",
    features: [
      "Energy pulse counting",
      "Cumulative energy calculation",
      "Threshold monitoring",
      "Over-consumption alert",
      "Billing cycle reset",
    ],
  },
  {
    number: 12,
    title: "Flood Monitoring and Pump Activation Controller",
    description:
      "Develop a controller that monitors water levels in urban drainage systems and activates drainage pumps when critical levels are reached. Sequential pump activation should be used to prevent overload.",
    features: [
      "Multi-level water sensing",
      "Sequential pump activation",
      "Flood alert indication",
      "Pump status monitoring",
      "System reset",
    ],
  },
  {
    number: 13,
    title: "Automated Warehouse Inventory Counter",
    description:
      "Design a controller that tracks goods entering and leaving a warehouse and maintains an accurate inventory count. Alerts should be generated when stock levels exceed or drop below defined thresholds.",
    features: [
      "Inventory entry and exit tracking",
      "Real-time stock count",
      "Low stock alert",
      "Storage capacity alert",
      "Inventory display output",
    ],
  },
  {
    number: 14,
    title: "Smart Disaster Alert Broadcasting Controller",
    description:
      "Develop a digital controller for emergency warning systems that activates sirens, display boards, and communication outputs when disaster alerts are received.",
    features: [
      "Emergency signal detection",
      "Multi-channel alert activation",
      "Alert duration control",
      "Priority interrupt handling",
      "System reset functionality",
    ],
  },
  {
    number: 15,
    title: "Urban Microgrid Power Distribution Controller",
    description:
      "Design a controller that manages power distribution between renewable sources, battery storage, and consumer loads within a microgrid system.",
    features: [
      "Power source selection logic",
      "Battery charge and discharge control",
      "Load demand monitoring",
      "Source switching mechanism",
      "Power shortage alert",
    ],
  },
  {
    number: 16,
    title: "Intelligent Queue Management Controller",
    description:
      "Design a digital controller for a multi-counter service center where customers receive tokens and are assigned to available counters dynamically.",
    features: [
      "Sequential token generation",
      "Counter allocation logic",
      "Queue management",
      "Counter availability monitoring",
      "Daily reset functionality",
    ],
  },
  {
    number: 17,
    title: "Smart Cold Storage Temperature Controller",
    description:
      "Develop a controller that maintains safe temperature levels within a cold storage facility by activating cooling mechanisms when temperature exceeds specified limits.",
    features: [
      "Temperature monitoring",
      "Cooling activation logic",
      "Hysteresis control",
      "Temperature violation alert",
      "Reset capability",
    ],
  },
  {
    number: 18,
    title: "Digital Package Weight Verification System",
    description:
      "Create a controller for an automated packaging line that verifies whether product weights fall within acceptable limits and rejects packages outside the allowed range.",
    features: [
      "Weight comparison logic",
      "Acceptance or rejection control",
      "Package counters",
      "Fault alert output",
      "Sorting control signals",
    ],
  },
  {
    number: 19,
    title: "Secure Access Card Authentication System",
    description:
      "Design a digital controller for facility access control that verifies card codes before granting entry. Multiple invalid attempts must trigger a security lockout.",
    features: [
      "Access code validation",
      "Entry authorization control",
      "Failed attempt counter",
      "Security lockout mechanism",
      "Alarm signal output",
    ],
  },
  {
    number: 20,
    title: "Smart Battery Charging Controller",
    description:
      "Develop a controller that manages battery charging cycles while preventing overcharging and detecting low battery conditions.",
    features: [
      "Battery level monitoring",
      "Charging state control",
      "Overcharge protection",
      "Charge completion indication",
      "Low battery alert",
    ],
  },
  {
    number: 21,
    title: "Automated Toll Collection Controller",
    description:
      "Design a toll gate controller that authenticates vehicle tags and automatically opens the gate for authorized vehicles while logging transactions.",
    features: [
      "Vehicle authentication logic",
      "Automatic gate control",
      "Transaction counter",
      "Unauthorized vehicle alert",
      "System reset",
    ],
  },
  {
    number: 22,
    title: "Digital Industrial Safety Interlock Controller",
    description:
      "Develop a controller ensuring industrial machines operate only when all safety conditions are satisfied.",
    features: [
      "Safety condition monitoring",
      "Machine enable control",
      "Emergency stop override",
      "Fault detection logic",
      "Safety alert output",
    ],
  },
  {
    number: 23,
    title: "Automated Library Book Management System",
    description:
      "Create a controller that tracks borrowing and returning of books in a digital library system while maintaining inventory records.",
    features: [
      "Borrow and return tracking",
      "Inventory counter",
      "Book availability verification",
      "Stock limit protection",
      "System reset",
    ],
  },
  {
    number: 24,
    title: "Smart Classroom Attendance Counter",
    description:
      "Design a controller that records student entry and exit to maintain accurate classroom attendance levels.",
    features: [
      "Entry and exit detection",
      "Attendance tracking",
      "Capacity alert",
      "Attendance display output",
      "Session reset",
    ],
  },
  {
    number: 25,
    title: "Digital Ticket Validation System",
    description:
      "Develop a ticket verification controller used in automated transport systems that validates ticket codes before allowing entry.",
    features: [
      "Ticket code verification",
      "Entry authorization",
      "Invalid ticket detection",
      "Transaction counter",
      "Reset functionality",
    ],
  },
  {
    number: 26,
    title: "Smart Irrigation Pump Controller",
    description:
      "Design an automated irrigation controller that activates pumps based on soil moisture conditions.",
    features: [
      "Soil moisture threshold detection",
      "Pump control logic",
      "Irrigation cycle monitoring",
      "Water shortage alert",
      "Manual override",
    ],
  },
  {
    number: 27,
    title: "Automated Fuel Station Pump Controller",
    description:
      "Develop a controller for a digital fuel dispensing system used at automated fuel stations. The system should allow users to select a fuel quantity or price limit, start dispensing fuel accordingly, and automatically stop dispensing once the specified amount has been delivered.",
    features: [
      "Fuel quantity or cost selection input",
      "Fuel dispensing control logic",
      "Real-time fuel delivery tracking",
      "Automatic dispensing termination",
      "Transaction completion signal",
    ],
  },
  {
    number: 28,
    title: "Smart Fire Detection and Alarm Controller",
    description:
      "Develop a digital monitoring system that detects fire conditions using smoke and temperature signals and activates alarms.",
    features: [
      "Smoke and temperature monitoring",
      "Fire condition detection",
      "Alarm activation",
      "Emergency output signals",
      "Reset after alarm",
    ],
  },
  {
    number: 29,
    title: "Automated Manufacturing Process Sequencer",
    description:
      "Design a controller that manages sequential stages of an industrial manufacturing process ensuring proper order of machine operations.",
    features: [
      "Sequential process control",
      "Stage completion detection",
      "Machine activation signals",
      "Process completion output",
      "Emergency stop override",
    ],
  },
  {
    number: 30,
    title: "Digital Sports Score Tracking System",
    description:
      "Develop a digital scoreboard controller that tracks scores for two teams and determines the winner when predefined conditions are met.",
    features: [
      "Score update logic",
      "Team score tracking",
      "Winning condition detection",
      "Score display output",
      "Automatic reset for new game",
    ],
  },
  {
    number: 31,
    title: "Smart Air Quality Monitoring Controller",
    description:
      "Design a controller that monitors indoor air quality using pollution level inputs. When pollution exceeds a safe threshold, the system must activate ventilation systems and generate alerts.",
    features: [
      "Air quality threshold monitoring",
      "Ventilation activation logic",
      "Pollution alert generation",
      "Status indicator output",
      "System reset functionality",
    ],
  },
  {
    number: 32,
    title: "Digital Water Usage Monitoring System",
    description:
      "Develop a controller that tracks water usage in a residential or industrial system by counting flow pulses and generating alerts when daily usage exceeds predefined limits.",
    features: [
      "Water flow pulse counting",
      "Daily consumption tracking",
      "Usage threshold alert",
      "Consumption display output",
      "Daily reset function",
    ],
  },
  {
    number: 33,
    title: "Automatic Door Access Controller",
    description:
      "Design a controller that manages an automatic sliding door system using motion detection inputs. The door should open when motion is detected and close automatically after a defined delay.",
    features: [
      "Motion detection processing",
      "Door open and close control",
      "Auto-close delay logic",
      "Obstacle detection input",
      "Door status output",
    ],
  },
  {
    number: 34,
    title: "Smart Greenhouse Climate Controller",
    description:
      "Develop a controller that maintains optimal greenhouse conditions by regulating fans and heaters based on temperature and humidity inputs.",
    features: [
      "Temperature monitoring",
      "Humidity threshold detection",
      "Fan and heater activation logic",
      "Climate status indicators",
      "Manual override input",
    ],
  },
  {
    number: 35,
    title: "Automated Fuel Pump Control System",
    description:
      "Design a controller for a fuel dispensing station that authorizes fuel dispensing only after payment confirmation and stops dispensing once the preset fuel quantity is delivered.",
    features: [
      "Payment authorization signal",
      "Fuel dispensing control",
      "Quantity monitoring",
      "Fuel delivery completion signal",
      "Emergency stop input",
    ],
  },
  {
    number: 36,
    title: "Smart Hospital Bed Monitoring System",
    description:
      "Create a controller that monitors hospital bed occupancy and triggers alerts if patients leave the bed unexpectedly.",
    features: [
      "Bed occupancy detection",
      "Patient movement monitoring",
      "Alert generation",
      "Bed status output",
      "System reset functionality",
    ],
  },
  {
    number: 37,
    title: "Digital Visitor Management Counter",
    description:
      "Design a system that tracks visitors entering and exiting a building while maintaining a visitor log count and preventing entry once maximum capacity is reached.",
    features: [
      "Visitor entry and exit counters",
      "Occupancy monitoring",
      "Maximum capacity detection",
      "Entry permission control",
      "Status display output",
    ],
  },
  {
    number: 38,
    title: "Automated Coffee Vending Controller",
    description:
      "Develop a controller for a vending machine that prepares beverages based on user selection and ensures ingredient availability before dispensing.",
    features: [
      "Beverage selection processing",
      "Ingredient availability check",
      "Drink preparation control",
      "Dispense completion signal",
      "Ingredient low alert",
    ],
  },
  {
    number: 39,
    title: "Smart Solar Panel Power Monitor",
    description:
      "Design a controller that monitors solar panel power generation and switches between solar power and backup supply depending on generation levels.",
    features: [
      "Solar power monitoring",
      "Backup power switching logic",
      "Power generation status output",
      "Low generation alert",
      "System reset functionality",
    ],
  },
  {
    number: 40,
    title: "Automatic Classroom Projector Controller",
    description:
      "Develop a controller that activates a classroom projector when a presentation device is connected and turns it off after inactivity.",
    features: [
      "Device connection detection",
      "Projector power control",
      "Inactivity timer logic",
      "Status indicator output",
      "Manual override control",
    ],
  },
];

/** Helper to look up a problem by its number (1–40) */
export function getProblemByNumber(num: number): StaticProblemStatement | undefined {
  return problemStatements.find((ps) => ps.number === num);
}
