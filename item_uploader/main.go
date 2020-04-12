package main

import (
	"log"
	"math"
	"net/http"
	"net/url"
	"regexp"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"

	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type Item struct {
	Name      string `json:"name"`
	Boss      string `json:"boss"`
	ArmorType string `json:"armor_type"`
	Slot      string `json:"slot"`
	GP        int    `json:"gp"`
	Location  string `json:"location"`
	Category  string `json:"category"`
	Ilvl      int    `json:"ilvl"`
	ItemID    string `json:"item_id"`
	ToolTip   string `json:"tooltip"`
}

type ToolTip struct {
	Quality string `json:"quality"`
	Icon    string `json:"icon"`
	HTML    string `json:"tooltip"`
}

func getItems() []Item {
	raw, err := ioutil.ReadFile("./aq40.json")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	var items []Item
	json.Unmarshal(raw, &items)
	return items
}

func getItemID(name string) string {
	query := url.QueryEscape(name)
	url := "https://classicdb.ch/opensearch.php?search=" + query

	client := http.Client{
		Timeout: time.Second * 2, // Maximum of 2 secs
	}
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatal(err)
	}

	res, getErr := client.Do(req)
	if getErr != nil {
		log.Fatal(getErr)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	re := regexp.MustCompile(`\d{5}`)
	return string(re.Find([]byte(body)))
}

func getItemTooltip(id string) string {
	url := "https://classic.wowhead.com/tooltip/item/" + id

	client := http.Client{
		Timeout: time.Second * 2, // Maximum of 2 secs
	}
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatal(err)
	}

	res, getErr := client.Do(req)
	if getErr != nil {
		log.Fatal(getErr)
	}

	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	var tooltip ToolTip
	json.Unmarshal(body, &tooltip)
	println(tooltip.HTML)
	return tooltip.HTML
}

func main() {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	svc := dynamodb.New(sess)
	items := getItems()

	tableName := "ZugThugzItems"

	for _, item := range items {
		m := make(map[string]float64)
		m["Head"] = 1.0
		m["Neck"] = 0.5
		m["Shoulder"] = 0.75
		m["Back"] = 0.5
		m["Chest"] = 1.0
		m["Wrist"] = 0.5
		m["Waist"] = 0.75
		m["Hands"] = 0.75
		m["Legs"] = 1.0
		m["Feet"] = 0.75
		m["Ring"] = 0.5
		m["Legs"] = 1.0
		m["Relic"] = 0.5
		m["Trinket"] = 0.75
		m["Main Hand"] = 1.5
		m["Off Hand"] = 0.5
		m["One-Hand"] = 1.5
		m["Shield"] = 0.5
		m["Ranged"] = 0.5
		m["Two-Hand"] = 2

		modifier := 4.83
		slotModifier := m[item.Slot]
		power := math.Pow(2.0, ((float64(item.Ilvl)/26.0)+(4.0-4.0))) * slotModifier
		gp := modifier * power * 1
		item.GP = int(math.Floor(gp))

		item.ItemID = getItemID(item.Name)
		//item.ToolTip = getItemTooltip(item.ItemID)
		av, err := dynamodbattribute.MarshalMap(item)
		if err != nil {
			fmt.Println("Got error marshalling map:")
			fmt.Println(err.Error())
			os.Exit(1)
		}

		input := &dynamodb.PutItemInput{
			Item:      av,
			TableName: aws.String(tableName),
		}

		_, err = svc.PutItem(input)
		if err != nil {
			fmt.Println("Got error calling PutItem:")
			fmt.Println(err.Error())
			os.Exit(1)
		}

		fmt.Printf("%s,%d,%s,%d,%s,%s,%s,%s,%s\n", item.ItemID, item.GP, item.Name, item.Ilvl, item.Slot, item.Boss, item.Location, item.ArmorType, item.Category)
	}
}
