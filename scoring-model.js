function evaluateAirportDecision({
  airport,
  currentZone,
  vehicleType,
  airportWait,
  time,
  traffic,
  event
}) {
  let score = 0;
  let reasons = [];
  let action = '';

  // Current zone / repositioning scoring
  if (airport === 'hobby') {
    if (currentZone === 'nearHOU') {
      score += 3;
      reasons.push('You are already near HOU/Hobby, so unpaid repositioning risk is low.');
    } else if (currentZone === 'south' || currentZone === 'downtown') {
      score += 1;
      reasons.push('Your current zone is reasonably positioned for Hobby compared with chasing it from farther across town.');
    } else if (currentZone === 'nearIAH' || currentZone === 'north' || currentZone === 'west') {
      score -= 2;
      reasons.push('Chasing Hobby from your current zone may create too much unpaid mileage and time.');
    } else if (currentZone === 'east') {
      score -= 1;
      reasons.push('East Houston can work for Hobby, but traffic and unpaid repositioning still matter.');
    }
  }

  if (airport === 'iah') {
    if (currentZone === 'nearIAH') {
      score += 3;
      reasons.push('You are already near IAH, so the airport opportunity is less risky than driving across town to chase it.');
    } else if (currentZone === 'north') {
      score += 1;
      reasons.push('North Houston is reasonably positioned for IAH if wait time and traffic are acceptable.');
    } else if (currentZone === 'nearHOU' || currentZone === 'south') {
      score -= 3;
      reasons.push('Chasing IAH from the Hobby/South Houston side can create a lot of unpaid repositioning time.');
    } else if (currentZone === 'west' || currentZone === 'east' || currentZone === 'downtown') {
      score -= 1;
      reasons.push('Your current zone is not terrible for IAH, but the repositioning cost needs to be respected.');
    }
  }

  if (airport === 'galveston') {
    if (currentZone === 'south' || currentZone === 'nearHOU') {
      score += 1;
      reasons.push('South Houston or the Hobby side is better positioned for a Galveston cruise play than the north or west side.');
    } else if (currentZone === 'nearIAH' || currentZone === 'north' || currentZone === 'west') {
      score -= 3;
      reasons.push('Galveston is usually too far to chase from your current zone unless cruise activity is very strong.');
    } else if (currentZone === 'downtown' || currentZone === 'east') {
      score -= 1;
      reasons.push('Galveston may be possible from your zone, but only if cruise timing is strong enough to justify the drive.');
    }
  }

  // Vehicle type scoring
  if (vehicleType === 'uberX') {
    reasons.push('Uber X can do well with airport drop-offs, but airport pickup queues must be watched carefully.');
  } else if (vehicleType === 'comfort') {
    score += 1;
    reasons.push('Comfort and Premier rides may produce slightly better payouts than standard Uber X.');
  } else if (vehicleType === 'uberXL') {
    score += 2;
    reasons.push('Uber XL vehicles can tolerate airport waits better because of larger fares, groups, and luggage demand.');
  }

  // Expected airport wait time scoring
  if (airportWait === 'under15') {
    score += 3;
    reasons.push('A short expected wait makes the opportunity much stronger.');
  } else if (airportWait === '15-30') {
    score += 1;
    reasons.push('A 15–30 minute wait can be reasonable if the trip quality is strong.');
  } else if (airportWait === '30-60') {
    if (vehicleType === 'uberXL') {
      score -= 2;
      reasons.push('A 30–60 minute wait is a moderate risk for Uber XL, even though larger fares may still help offset the wait.');
    } else if (vehicleType === 'comfort') {
      score -= 2.5;
      reasons.push('A 30–60 minute wait is a moderate penalty for Comfort or Premier because the better fare may not fully offset the idle time.');
    } else {
      score -= 3;
      reasons.push('A 30–60 minute wait is a moderate-to-heavy penalty for Uber X or standard rides because it can drag down hourly earnings.');
    }
  } else if (airportWait === '60+') {
    if (vehicleType === 'uberXL') {
      score -= 4;
      reasons.push('Over 60 minutes is a heavy penalty even for Uber XL because the wait can overwhelm the larger fare.');
    } else if (vehicleType === 'comfort') {
      score -= 5;
      reasons.push('Over 60 minutes is a heavy penalty for Comfort or Premier unless demand factors are unusually strong.');
    } else {
      score -= 6;
      reasons.push('Over 60 minutes is a severe penalty for Uber X or standard rides and can destroy hourly earnings.');
    }
  }

  // Time of day scoring
  if (time === 'morning') {
    score += 2;
    reasons.push('Morning airport demand can be stronger from early departures and business travel.');
  } else if (time === 'afternoon') {
    score += 1;
    reasons.push('Afternoon can work, but traffic risk should be watched carefully.');
  } else if (time === 'evening') {
    score += 1;
    reasons.push('Evening may bring arrivals, but traffic and driver saturation can reduce profit.');
  } else if (time === 'late') {
    score -= 1;
    reasons.push('Late night can be hit-or-miss depending on arrivals and safety comfort.');
  } else {
    reasons.push('Midday is usually neutral unless there is strong flight, cruise, or event activity.');
  }

  // Traffic scoring
  if (traffic === 'light') {
    score += 2;
    reasons.push('Light traffic makes the trip more efficient.');
  } else if (traffic === 'normal') {
    reasons.push('Normal traffic keeps the decision balanced.');
  } else {
    score -= 2;
    reasons.push('Heavy traffic can destroy dollars-per-hour even if the fare looks decent.');
  }

  // Event/cruise scoring
  if (event === 'yes') {
    score += 3;
    reasons.push('Nearby event or cruise activity may create stronger ride demand.');
  } else {
    reasons.push('No major event or cruise signal means demand may rely mostly on normal airport flow.');
  }

  // Airport-specific logic
  if (airport === 'hobby') {
    score += 1;
    reasons.push('Hobby is often easier to work because pickups and getting back to busy areas are usually quicker.');
  }

  if (airport === 'iah' && traffic === 'heavy') {
    score -= 1;
    reasons.push('IAH plus heavy traffic can create long unpaid repositioning and slower turnarounds.');
  }

  if (airport === 'galveston') {
    if (event === 'yes') {
      score += 2;
      reasons.push('Galveston cruise activity can create high-value rides when timed correctly.');
    } else {
      score -= 2;
      reasons.push('Without cruise activity, Galveston can leave you stranded or force long unpaid miles.');
    }
  }

  let decision = '';
  let resultClass = '';
  let hourlyEstimate = '';

  if (score >= 5) {
    decision = 'GO';
    resultClass = 'go';
    action = 'Best move: consider heading there now, but stay alert for changing conditions.';
  } else if (score >= 1) {
    decision = 'WAIT';
    resultClass = 'wait';
    action = 'Best move: monitor conditions first. Do not chase it unless you are already nearby.';
  } else {
    decision = 'AVOID';
    resultClass = 'avoid';
    action = 'Best move: avoid repositioning there right now. Look for a better zone with less risk.';
  }

  // Estimated hourly earnings
  if (airportWait === '60+') {
    if (score <= 2) {
      hourlyEstimate = 'Under $15/hr';
    } else if (score <= 7) {
      hourlyEstimate = '$15–20/hr';
    } else {
      hourlyEstimate = '$20–30/hr';
    }
  } else if (score <= 0) {
    hourlyEstimate = 'Under $15/hr';
  } else if (score <= 4) {
    hourlyEstimate = '$15–20/hr';
  } else if (score <= 7) {
    hourlyEstimate = '$20–30/hr';
  } else {
    hourlyEstimate = '$30+/hr';
  }

  return {
    score,
    reasons,
    action,
    decision,
    resultClass,
    hourlyEstimate
  };
}

globalThis.evaluateAirportDecision = evaluateAirportDecision;
