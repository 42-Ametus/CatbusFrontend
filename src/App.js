import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';

// This would be loaded from your JSON file
const routesConfig = {
  "routes": {
    "W-4FA9+Jita": {
      "cost": 800,
      "collateral": 1,
      "maxSize": 110000,
      "dest": "Jita IV - Moon 4 - Caldari Navy Assembly Plant"
    },
    "W-4FA9+4-HWWF": {
      "cost": 700,
      "collateral": 0,
      "maxSize": 360000,
      "dest": "4-HWWF - WinterCo. Central Station"
    },
    "Jita+W-4FA9": {
      "cost": 800,
      "collateral": 0,
      "maxSize": 360000,
      "dest": "W-4FA9 - Demon Spawner"
    },
    "Jita+4-HWWF": {
      "cost": 250,
      "collateral": 0,
      "maxSize": 360000,
      "dest": "4-HWWF - WinterCo. Central Station"
    },
    "4-HWWF+Jita": {
      "cost": 250,
      "collateral": 1,
      "maxSize": 110000,
      "dest": "Jita IV - Moon 4 - Caldari Navy Assembly Plant"
    }
  }
};

const ResultDisplay = ({ label, value, isCopyableNumber = false }) => {
  const handleCopy = async () => {
    if (isCopyableNumber) {
      try {
        // Extract just the number from the value (remove 'm³' and commas)
        const numericValue = value.replace(/[^0-9.]/g, '');
        await navigator.clipboard.writeText(numericValue);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div 
      className={`flex justify-between items-center p-2 border-b last:border-b-0 
        ${isCopyableNumber ? 'border rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer my-1' : ''}`}
      onClick={handleCopy}
    >
      <span className="text-sm font-medium text-gray-600">{label}:</span>
      <span className="text-sm font-mono">{value}</span>
    </div>
  );
};

const CopyDisplay = ({ label, value, isCopyableNumber = false, isCopyableText = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopyableNumber) {
      try {
        // Extract just the number from the value (remove 'm³' and commas)
        const numericValue = value.replace(/[^0-9.]/g, '');
        await navigator.clipboard.writeText(numericValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 300); // Reset after 500ms
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
    if (isCopyableText) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 300); // Reset after 500ms
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div 
      className={`flex justify-between items-center p-2 border-b 
        ${(isCopyableNumber || isCopyableText) ? 'border rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer my-1 h-10' : ''}
        cursor-pointer transition-all duration-200
        ${copied ? 'bg-green-100 hover:bg-green-100' : ''}
        `}
      onClick={handleCopy}
    >
      <span className="text-sm font-medium text-gray-600">{label}:</span>
      <span className="text-xs font-mono">{value}</span>
    </div>
  );
};

const RouteCalculator = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [destString, setDestinationString] = useState('');
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({
    routeCost: 0,
    collateral: 0,
    maxSize: 0,
    volume: 0,
    totalCost: 0,
    packageValue: 0
    // Add any other result fields you need
  });

  // Get unique pickup and destination locations from valid routes
  const validRoutes = Object.keys(routesConfig.routes).map(route => route.split('+'));
  const pickupLocations = [...new Set(validRoutes.map(route => route[0]))];
  const getValidDestinations = (selectedPickup) => {
    if (!selectedPickup) return [];
    return validRoutes
      .filter(route => route[0] === selectedPickup)
      .map(route => route[1]);
  };

  // Update route information whenever pickup or destination changes
  useEffect(() => {
    if (pickup && destination) {
      const routeKey = `${pickup}+${destination}`;
      const routeConfig = routesConfig.routes[routeKey];
      
      if (routeConfig) {
        console.log(routeConfig.cost)
        setResults(prev => ({
          ...prev,
          routeCost: routeConfig.cost,
          collateral: routeConfig.collateral,
          maxSize: routeConfig.maxSize,
          // Keep the previous volume and totalCost until new calculation
          volume: prev.volume,
          totalCost: prev.volume * routeConfig.cost + routeConfig.collateral * prev.packageValue / 100,
        }));
        setDestinationString(routeConfig.dest);
      }
    } else {
      // Reset route-specific values when route is incomplete
      setResults(prev => ({
        ...prev,
        routeCost: 0,
        collateral: 0,
        maxSize: 0,
        totalCost: 0
      }));
      setDestinationString('');
    }
  }, [pickup, destination]);

  // Reset destination when pickup changes
  useEffect(() => {
    setDestination('');
    setDestinationString('');
  }, [pickup]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const routeKey = `${pickup}+${destination}`;
      const routeConfig = routesConfig.routes[routeKey];
      
      if (!routeConfig) {
        throw new Error('Invalid route selected');
      }

      const API_URL = process.env.REACT_APP_API_URL || 'https://catbusbackend.onrender.com';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: inputData,
          // Add any other parameters needed
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const apiResult = await response.json();

      console.log(apiResult)
      console.log(apiResult.immediatePrices.totalSellPrice)
      
      // Update results with API response and route configuration
      setResults(prev => ({
        ...prev,
        volume: apiResult.totalPackagedVolume || 0,
        packageValue: apiResult.immediatePrices.totalSellPrice,
        totalCost: routeConfig.cost * apiResult.totalPackagedVolume + routeConfig.collateral * apiResult.immediatePrices.totalSellPrice / 100
        // Add any other calculated results
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-center">
        <img 
          src="/catbusLogo.png" // Update this path to your logo
          alt="Logo"
          className="h-48 w-auto" // Adjust size as needed
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-6xl mx-auto">
        <Card className="flex-1">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <br/>
              <label className="text-sm font-medium">Pickup Location</label>
              <Select value={pickup} onValueChange={setPickup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pickup location" />
                </SelectTrigger>
                <SelectContent>
                  {pickupLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Select 
                value={destination} 
                onValueChange={setDestination}
                disabled={!pickup}
              >
                <SelectTrigger>
                  <SelectValue placeholder={pickup ? "Select destination" : "Select pickup location first"} />
                </SelectTrigger>
                <SelectContent>
                  {getValidDestinations(pickup).map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Input Data</label>
              <Textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Paste your data here"
                className="min-h-[200px]"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={!pickup || !destination || !inputData || loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Calculate'}
            </Button>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                Error: {error}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:w-1/3">
          <CardContent className="p-6">
            <br/>
            <h3 className="font-medium mb-4">Route Info</h3>
            <div className="space-y-1">
              <ResultDisplay label="Route Cost" value={`${results.routeCost} ISK/m³`} />
              <ResultDisplay label="Collateral" value={`${results.collateral.toLocaleString()} %`} />
              <ResultDisplay label="Max Size" value={`${results.maxSize.toLocaleString()} m³`} />
            </div>
            <br/>
            <h3 className="font-medium mb-4">Package Info</h3>
            <div className="space-y-1">
              <ResultDisplay label="Volume" value={`${results.volume.toLocaleString()} m³` }/>
              <ResultDisplay 
                label="Total Cost" 
                value={`${results.totalCost.toLocaleString()} ISK`} 
              />
            </div>
            <br/>
            <h3 className="font-medium mb-4">Copy Me</h3>
            <div className="space-y-1">
              <CopyDisplay label="Corp" value={`Catbus Logistics` } isCopyableText={true}/>
              <CopyDisplay label="Destination" value={`${destString.toLocaleString()}` } isCopyableText={true}/>
              <CopyDisplay label="Reward" value={`${results.totalCost.toLocaleString()}` } isCopyableNumber={true}/>
              <CopyDisplay label="Collateral" value={`${results.packageValue.toLocaleString()}` } isCopyableNumber={true}/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RouteCalculator;

//static height for copy area