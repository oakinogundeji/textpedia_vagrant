import argparse
import sys
import requests as req
from bs4 import BeautifulSoup as BSoup


def scrape(k_words):
    print 'received k_words from Main', k_words
    print 'number of k_words', len(k_words)
    for word in k_words:
        print 'k_word =', word
    return len(k_words)


def Main():
    parser = argparse.ArgumentParser(description="Webscraping Module")
    parser.add_argument('k_words', type=str, nargs='+')
    args = parser.parse_args()
    result = scrape(args.k_words)
    print 'result =', result
    #sys.stdout.flush()


if __name__ == '__main__':
    Main()
