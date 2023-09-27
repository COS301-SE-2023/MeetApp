import { Event } from "../events/schema";
import { Weight } from "../interfaces";
import { User } from "../users/schema";

export class RecommendationAlgorithm {
    private userId
    private user : User
    private userFriendsEvents : Event[]
    private userWeights : Weight[]
    private rate : number
    private userAttendances : Event[]
    private userFriends : User[]
    private daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private otherEvents : {event : Event, attendees : number}[]
    private TopRegionEvents : Event[]
    private TopCategoryEvents : Event[]
    private DurationWeight : number
    private LocationRangeWeight : number
    private FriendsInfluenceWeight : number
    private DayWeight : number
    private ChatRoomWeight : number
    private PopularityWeight : number
    private CategoryWeight : number
    private OrganisationWeight : number
    private RegionWeight : number
    private InterestWeight : number
    private TopSupportedOrganisations : string[]
    private MostPopularEvents : {event : Event, attendees : number}[]
    private threshold : number


    constructor(userId : string, userFriends : User[],userFriendsEvents : Event[], user : User, rate : number, userWeights : Weight[], userEvents : Event[], otherEvents : {event : Event, attendees : number}[], topCategory : Event[], topRegion : Event[], topOrgs : string[]) {
        this.userId = userId
        this.user = user
        this.threshold = 0.25
        this.userFriendsEvents = userFriendsEvents
        this.rate = rate
        this.userWeights = userWeights
        this.userAttendances = userEvents
        this.otherEvents = otherEvents
        this.userFriends = userFriends
        this.TopCategoryEvents = topCategory
        this.TopRegionEvents = topRegion
        this.TopSupportedOrganisations = topOrgs
        this.DurationWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'duration'
        })[0].value

        this.LocationRangeWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'location-range'
        })[0].value

        this.FriendsInfluenceWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'friend-influence'
        })[0].value

        this.ChatRoomWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'chat-room'
        })[0].value

        this.DayWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'day'
        })[0].value

        this.PopularityWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'popularity'
        })[0].value

        this.CategoryWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'category'
        })[0].value

        this.RegionWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'region'
        })[0].value

        this.InterestWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'interest'
        })[0].value

        this.OrganisationWeight = this.userWeights.filter(weight => {
                return weight.parameter == 'organisation'
        })[0].value
        this.MostPopularEvents = this.otherEvents.sort((a, b) => b.attendees - a.attendees);
    }

    public getRecommendations(){
        const EventsPlusScores = this.getScores()
        
        if (EventsPlusScores.length > 20)
        {
            const range10 = Array.from({ length: 9 - 0 + 1 }, (_, index) => index + 0);
            const Top10 = range10.map(index => EventsPlusScores[index]);
            const countleftOver = EventsPlusScores.length - 10 -1
            const highestScore = Top10[0].score
            this.threshold = highestScore/2
            const rangeLeftOver = Array.from({ length: countleftOver - 10 + 1 }, (_, index) => index + 10);
            const Others = rangeLeftOver.map(index => EventsPlusScores[index]);
            const shuffledArray = [...Others]; // Create a copy of the original array

            // Fisher-Yates shuffle algorithm
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return Top10.concat(shuffledArray)
            
        }
        return EventsPlusScores
        
    }

    private getScores(){
        const totalFriendsCount = this.userFriends.length
        const totalEventsCount = this.userAttendances.length
        console.log(`Total events count: ${totalEventsCount}`)
        console.log(`Total friends count: ${totalFriendsCount}`)
        

        const eventsAndScores = this.otherEvents.map((otherEvent) => {
            let score = 1;
            const clocation = otherEvent.event.location  as Record<string,number>
            const ParsedLocation = {lat : clocation['latitude'], lon : clocation['longitude']}
            if (totalEventsCount > 2 && totalEventsCount) {
                if (otherEvent.event.date){
                    score += this.dayLayer(otherEvent.event.date)*this.DayWeight
                    //console.log('day layer completed' + score)
                }
                if (ParsedLocation){
                    score += this.rangeLayer(ParsedLocation)*this.LocationRangeWeight
                    //console.log('range layer completed ' + score)
                }
                if (otherEvent.event.startTime && otherEvent.event.endTime){
                    score += this.durationLayer(otherEvent.event.startTime, otherEvent.event.endTime)*this.DurationWeight
                    //console.log('duration layer completed: ' + score)
                }
                if (otherEvent.event.category){
                    score += this.categoryLayer(otherEvent.event.category)*this.CategoryWeight
                    //console.log('category layer completed: ' + score)
                }
                if (otherEvent.event.region){
                    score += this.regionLayer(otherEvent.event.region)*this.RegionWeight
                    //console.log('region layer completed: ' + score)
                }
                if (otherEvent.event.organisation){
                    score += this.organisationLayer(otherEvent.event.organisation)*this.OrganisationWeight
                    //console.log('org layer completed: ' + score)
                }
            }
            if (otherEvent.event.category){
                score += this.interestLayer(otherEvent.event.category)*this.InterestWeight
                //console.log('interest layer completed: ' + score)
            }
            
            if (totalFriendsCount > 2 && totalFriendsCount)
                score += this.influenceLayer(otherEvent.event._id.toString())*this.FriendsInfluenceWeight

            score += this.chatRoomLayer()*this.ChatRoomWeight
            score += this.popularityLayer(otherEvent.event._id.toString())*this.PopularityWeight
            score /= 10
            
            return {event : otherEvent.event, score : score}

        })
        

        return eventsAndScores.sort((a, b) => b.score - a.score);
    }

    private TweakWeights(){
        return 0
    }
    

    private rangeLayer(eventLocation : {lat : number, lon : number}){
        const AttendingCoords = this.userAttendances.map(uevent => uevent.location  as Record<string,number>)
        const AttendingCoordsParsed = AttendingCoords.map(ulocation => ({lat : ulocation['latitude'], lon : ulocation['longitude']}))

        const averageRange = this.getAverageRange(AttendingCoordsParsed);

        if (this.isWithinLocationRange(eventLocation,averageRange))
            return 1

        if (this.isWithinLocationRange(eventLocation,averageRange+10))
            return 0.5

        if (this.isWithinLocationRange(eventLocation,averageRange+20))
            return 0.25
        
        if (this.isWithinLocationRange(eventLocation,averageRange+30))
            return 0.125
        return 0
        
    }

    private dayLayer(EventDate : string){
        const userDates = this.userAttendances.map( cevent => cevent.date)
        const sortedTopDays = this.countDaysOfWeek(userDates)
        if (this.getDayofWeek(EventDate) == sortedTopDays[0])
            return 1
        if (this.getNearDays(EventDate).includes(sortedTopDays[0]))
            return 0.5
        return 0

    }

    private categoryLayer(EventCategory : string){
        if (this.TopCategoryEvents[0].category == EventCategory)
            return 1
        if (this.TopCategoryEvents[1].category == EventCategory)
            return 0.5
        if (this.TopCategoryEvents[2].category == EventCategory)
            return 0.25
        return 0
    }

    private interestLayer(EventInterest : string){
        if (this.user.interests && this.user.interests.includes(EventInterest) )
            return 1
        else return 0
    }

    private regionLayer(EventRegion : string){
        //console.log(this.TopRegionEvents)
        if (this.TopRegionEvents[0].region == EventRegion)
            return 1
        if (this.TopRegionEvents[1].region == EventRegion)
            return 0.5
        if (this.TopRegionEvents[2].region == EventRegion)
            return 0.25
        return 0
        
    }

    private influenceLayer(EventID : string){
        let runningTotal = 0
        this.userFriendsEvents.forEach(event => {
            if (event._id.toString() == EventID)
                runningTotal += 0.20
            if (this.user.interests?.includes(event.category))
                runningTotal += 0.15
            if (this.user.region == event.region)
                runningTotal += 0.20
            
            if (this.TopCategoryEvents[0].category == event.category)
                runningTotal += 0.15
            if (this.TopCategoryEvents[1].category == event.category)
                runningTotal += 0.075
            if (this.TopCategoryEvents[2].category == event.category)
                runningTotal += 0.0325

            if (this.TopRegionEvents[0].region == event.region)
                runningTotal += 0.15
            if (this.TopRegionEvents[1].region == event.region)
                runningTotal += 0.075
            if (this.TopRegionEvents[2].region == event.region)
                runningTotal += 0.0325

            if (this.TopSupportedOrganisations[0] == event.organisation)
                runningTotal += 0.15
            if (this.TopSupportedOrganisations[1] == event.organisation)
                runningTotal += 0.075
            if (this.TopSupportedOrganisations[2] == event.organisation)
                runningTotal += 0.0325
            
        })
        return runningTotal
    }

    //check the average duration of events in user attendance and use range
    private durationLayer(startTime : string, endTime : string){
        const timeIntervals = this.userAttendances.map(cevent => ({startTime : cevent.startTime, endTime : cevent.endTime}))
        const durationAverage = this.calculateAverageDuration(timeIntervals)
        const durationInput = this.calculateDuration(startTime,endTime)
        const inputDurationMinutes = durationInput.minutes + (durationInput.hours*60)
        const averageDurationMintues = (durationAverage.hours*60) + durationAverage.minutes
        const minuteDifference = Math.abs(inputDurationMinutes - averageDurationMintues);
        if (minuteDifference <= 15) {
            return 1; 
          } 
        else if (minuteDifference <= 30) {
            return 0.5; 
          } 
        else if (minuteDifference <= 45) {
            return 0.25; 
          } 
        else {
            return 0; 
          }
    }

    //check the organisation that the user supports the moment
    private organisationLayer(orgName : string){
        if (this.TopSupportedOrganisations[0] == orgName)
            return 1
        if (this.TopSupportedOrganisations[1] == orgName)
            return 0.5
        if (this.TopSupportedOrganisations[2] == orgName)
            return 0.25
        return 0
    }

    //if event is popular throughout app (total event attendances)
    private popularityLayer(eventID : string){
        if (this.MostPopularEvents[0].event._id.toString() == eventID)
            return 1
        if (this.MostPopularEvents[1].event._id.toString() == eventID)
            return 0.5
        if (this.MostPopularEvents[2].event._id.toString() == eventID)
            return 0.25
        if (this.MostPopularEvents[3].event._id.toString() == eventID)
            return 0.125
        if (this.MostPopularEvents[4].event._id.toString() == eventID)
            return 0.0625
        if (this.MostPopularEvents[5].event._id.toString() == eventID)
            return 0.03125
        return 0
    }

    //if user has entered chat rooms hosted by event's organisation
    private chatRoomLayer(){
        return 0
    }


    private isWithinLocationRange(coordinates: { lat: number; lon: number }, range : number){
        const AttendingCoords = this.userAttendances.map(uevent => uevent.location  as Record<string,number>)
        const AttendingCoordsParsed = AttendingCoords.map(ulocation => ({lat : ulocation['latitude'], lon : ulocation['longitude']}))
        return AttendingCoordsParsed.some(coord => {
            const distance = this.calculateDistance(coord.lat, coord.lon, coordinates.lat, coordinates.lon);
            return distance <= range;
        })
    }

  private countDaysOfWeek(EventDatesArray : string[]) {
    const dayCounts: { [key: string]: number } = {}
    for (const dateString of EventDatesArray) {
      const date = new Date(dateString);
      const dayOfWeek = this.daysOfWeek[date.getDay()];
      dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
    }
  
    
    const sortedDaysOfWeek = Object.keys(dayCounts).sort((a, b) => dayCounts[b] - dayCounts[a]);
  
    return sortedDaysOfWeek;
  }
  
    

    private getAverageRange(coordinates: { lat: number; lon: number }[]){
        let totalDistance = 0
        for (let i = 0; i < coordinates.length - 1; i++) {
            for (let j = i + 1; j < coordinates.length; j++) {
              const distance = this.calculateDistance(
                coordinates[i].lat,
                coordinates[i].lon,
                coordinates[j].lat,
                coordinates[j].lon
              );
              totalDistance += distance;
            }
          }
        
          // Calculate the average range as the total distance divided by the number of pairs
          return totalDistance / ((coordinates.length * (coordinates.length - 1)) / 2);
    }

    private calculateDistance(
        lat1: number, lon1: number,
        lat2: number, lon2: number
      ): number {
        const earthRadiusKm = 6371; // Radius of the Earth in kilometers
      
        const lat1Rad = this.toRadians(lat1);
        const lat2Rad = this.toRadians(lat2);
        const latDiff = this.toRadians(lat2 - lat1);
        const lonDiff = this.toRadians(lon2 - lon1);
      
        const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) *
          Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = earthRadiusKm * c;
        return distance;
      }
      
      // Function to convert degrees to radians
      private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
      }

    private getDayofWeek(EventDate : string){
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(EventDate);
        const dayIndex = date.getDay();

        return daysOfWeek[dayIndex];
    }

    private getNearDays(EventDate : string) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(EventDate);
        const dayOfWeekIndex = date.getDay(); // Get the index of the provided date's day of the week
      
        // Calculate the previous day
        const previousDayIndex = (dayOfWeekIndex === 0 ? 6 : dayOfWeekIndex - 1); // Wrap around to Saturday if Sunday
        const previousDayOfWeek = daysOfWeek[previousDayIndex];
      
        // Calculate the next day
        const nextDayIndex = (dayOfWeekIndex === 6 ? 0 : dayOfWeekIndex + 1); // Wrap around to Sunday if Saturday
        const nextDayOfWeek = daysOfWeek[nextDayIndex];
      
        return [previousDayOfWeek, nextDayOfWeek];
      }
      private calculateDuration(startTime: string, endTime: string){
        // Parse the start and end times into Date objects
        const startParts = startTime.split(':').map(Number);
        const endParts = endTime.split(':').map(Number);
      
        // Calculate the time difference in minutes
        const totalStartMinutes = startParts[0] * 60 + startParts[1];
        const totalEndMinutes = endParts[0] * 60 + endParts[1];
        const timeDifferenceMinutes = totalEndMinutes - totalStartMinutes;
      
        // Calculate hours and remaining minutes
        const hours = Math.floor(timeDifferenceMinutes / 60);
        const minutes = timeDifferenceMinutes % 60;
      
        return { hours, minutes };
      }

      private calculateAverageDuration(timeIntervals : { startTime : string, endTime : string }[]) {
        if (!timeIntervals || timeIntervals.length === 0) {
          return { hours: 0, minutes: 0 };
        }
      
        let totalMinutes = 0;
      
        for (const timeInterval of timeIntervals) {
          const { hours, minutes } = this.calculateDuration(timeInterval.startTime, timeInterval.endTime);
          const totalIntervalMinutes = hours * 60 + minutes;
          totalMinutes += totalIntervalMinutes;
        }
      
        const averageMinutes = totalMinutes / timeIntervals.length;
      
        // Calculate hours and remaining minutes for the average duration
        const averageHours = Math.floor(averageMinutes / 60);
        const averageMinutesRemaining = Math.round(averageMinutes % 60);
      
        return { hours: averageHours, minutes: averageMinutesRemaining };
      }
      
      
      
      
}