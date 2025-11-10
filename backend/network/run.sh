clear

export PATH=$PATH:/Users/macbookprom1pro/Projects/SRS-Fabric/backend/fabric-samples/bin

# export DOCKER_DEFAULT_PLATFORM=linux/amd64 --> can find fabric images for arm64
# docker run --rm hyperledger/fabric-nodeenv:2.4 node -v --> ailed to pull hyperledger/fabric-nodeenv:2.4: no matching manifest for linux/arm64/v8 in the manifest list entries

echo "##########################################"
echo "Network down"
echo "##########################################"
echo ""

./network.sh down

echo ""
echo "##########################################"
echo "Network up with CA & Couchdb"
echo "##########################################"
echo ""

pwd

./network.sh up -ca -s couchdb

echo ""
echo "##########################################"
echo "Creating channel"
echo "##########################################"
echo ""

./network.sh createChannel

echo ""
echo "##########################################"
echo "Deploying chaincode"
echo "##########################################"
echo ""

./network.sh deployCC -ccn basic -ccv 1.0 -ccl javascript -ccp ../chaincode

echo ""
echo "##########################################"
echo "Done"
echo "##########################################"